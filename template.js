String.prototype.replaceAll = function (FindText, RepText) {
  regExp = new RegExp(FindText, 'g');
  return this.replace(regExp, RepText);
}


const getTsTemplate = ({ fileName, data, config }) => {
  const getMethod = () => {
    if (data.method === 'GET') return 'requestGet';
    if (data.method === 'POST') return 'requestPost';
  };

  // TODO:模版拼接未完成
  toTsType(data.query);
  toTsType(data.response);

  console.log(data.query, data.response);

  return `import { ${getMethod()} } from '${config.requestPath}';

export interface ${fileName}Params ${JSON.stringify(data.query)}


export interface ${fileName}Res ${JSON.stringify(data.response)}

//${data.description}
export async function ${fileName}(params: ${fileName}Params): Promise<${fileName}Res> {
  return await requestGet('${data.path}', params);
}`;
};

const getIndexTemplate = (data) => {
  const importFileNames = data.map((item) => `import { ${item} } from './${item}';\n`).join('');

  const exportFileNames = data.map((item) => `  ${item},\n`).join('');

  return `${importFileNames}
export default {
${exportFileNames}};`;
};

function replaceAll (FindText, RepText) {
  regExp = new RegExp(FindText, 'g');
  return this.replace(regExp, RepText);
}

const toString = Object.prototype.toString;

function isObject (obj) {
  return toString.call(obj) === '[object Object]';
}


function toTsType (data) {
  for (let key in data) {
    if(isObject(data[key])) {
      toTsType(data[key])
    }else{
      data[key] = typeof data[key]
    }
  }
}


module.exports = {
  getTsTemplate,
  getIndexTemplate,
};
