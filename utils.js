const constants = require('./constants')

function processKeyWord(fileName, addKeywords='') {
  if (constants.keywords.includes(fileName)) {
    return addKeywords+'_'+fileName;
  }
  return fileName;
}

function getFilename(path) {
  const ar = path.split('/');
  const filename = ar[ar.length - 1].slice(0, -3);
  return '/' + filename.split(/_+/).join('/');
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

function toTsObj (data) {
  for (let key in data) {
    if(isObject(data[key])) {
      toTsType(data[key])
    }else{
      data[key] = typeof data[key] + ";"
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

module.exports = {
  processKeyWord,
  getFilename,
  toTsType,
  toDeleteStr
}