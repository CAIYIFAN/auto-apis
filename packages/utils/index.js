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


function toTsType (data) {
  toTsObj(data);
  const strs = JSON.stringify(data);
  const str = toDeleteStr(toDeleteStr(strs, '"'), ',')
  return str;
}


function toTsObj(data) {
  for (let key in data) {
    if (isObject(data[key])) {
      toTsType(data[key]);
    } else {
      if (typeof data[key] === 'object') {
        if (Array.isArray(data[key])) {
          toTsObj(data[key][0]);
          data[key] = `Array<{${JSON.stringify(data[key][0])}}> | [];`;
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
  toDeleteStr,
  getMockPath,
  isEmpty
}