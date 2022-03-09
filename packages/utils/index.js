const constants = require('../constants')
const fs = require('fs')

// 处理js存在关键字，无法作为变量名的问题
function processKeyWord(fileName, addKeywords='') {
  if (constants.keywords.includes(fileName)) {
    return addKeywords+'_'+fileName;
  }
  return fileName;
}

// 获取文件路径
function getFilename(path) {
  const ar = path.split('/');
  const filename = ar[ar.length - 1].slice(0, -3);
  return '/' + filename.split(/_+/).join('/');
}

// 判断是否为空对象
function isEmpty(obj) {
  for (var i in obj) { // 如果不为空，则会执行到这一步，返回false
    return false
  }
  return true // 如果为空,返回true
}

const toString = Object.prototype.toString;

function isObject (obj) {
  return toString.call(obj) === '[object Object]';
}


// function toTsType(data) {
//   toTsObj(data);
//   const strs = JSON.stringify(data);
//   const str = toDeleteStr(toDeleteStr(toDeleteStr(strs, '"'), ','), '\\')
//   return str;
// }

function toTsType(data) {
  const result = toTsObj2(data);
  const strs = JSON.stringify(result);
  const str = toDeleteStr(toDeleteStr(toDeleteStr(strs, '"'), ','), '\\')
  return str;
}


function toTsObj2(data) {
    // 理论上入参只会是对象
    let result =  Array.isArray(data) ? [] : {};
    for(let key in data) {
      if (!data.hasOwnProperty(key)) return;
      if (typeof data[key] === 'object') {
        if (Array.isArray(data[key])) {
          result[key] = typeof data[key][0] !== 'object' ? `Array<${typeof data[key][0]}> | [];` : `Array<${JSON.stringify(toTsObj2(data[key][0]))}> | [];`
        } else {
          result[key] = toTsObj2(data[key])
        }
      } else {
        result[key] = typeof data[key] + ';';
      }
    }
    return result;
}


function toTsObj(data) {
  for (let key in data) {
    if (isObject(data[key])) {
      toTsType(data[key]);
    } else {
      if (typeof data[key] === 'object') {
        if (Array.isArray(data[key])) {
          toTsObj(data[key][0]);
          if (typeof data[key][0] === 'number' || typeof data[key][0] === 'string' || typeof data[key][0] === 'boolean') {
            data[key] = `Array<${typeof data[key][0]}> | [];`
          } else {
            data[key] = `Array<${JSON.stringify(data[key][0])}> | [];`;
          }
        }
      } else {
        data[key] = typeof data[key] + ';';
      }
    }
  }
}

function toDeleteStr(str, keyword) {
  const tmp = str.split('');
  for(let i = 0; i < tmp.length; i++) {
    if(tmp[i] === keyword) {
      tmp[i] = ''
    }
  }
  return tmp.join('');
}

function getMockPath(mockPath) {
  const fileGroup = fs.readdirSync(mockPath);
  const mock = fileGroup.map((item) => ({
    path: '/' + item.split('_').join('/').split('.')[0],
    fileName: mockPath + '/' + item
  }))
  console.log(mock);
  return mock;
}

module.exports = {
  processKeyWord,
  getFilename,
  toTsType,
  // toTsType2,
  toDeleteStr,
  getMockPath,
  isEmpty
}