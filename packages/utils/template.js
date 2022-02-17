const utils = require('.');
const { toTsType } = utils;

// ts模版
const getTsTemplate = ({ fileName, data, config }) => {
  const getMethod = () => {
    if (data.method === 'GET') return config.requestGet;
    if (data.method === 'POST') return config.requestPost;
  };

  return `import { ${getMethod()} } from '${config.requestPath}';

export interface ${fileName}Params ${toTsType(data.query)}


export interface ${fileName}Res ${toTsType(data.response)}

//${data.description}
export async function ${fileName}(params: ${fileName}Params): Promise<${fileName}Res> {
  return await requestGet('${data.path}', params);
}`;
};

// apis的index文件模版
const getIndexTemplate = (data) => {
  const importFileNames = data.map((item) => `import { ${item} } from './${item}';\n`).join('');

  const exportFileNames = data.map((item) => `  ${item},\n`).join('');

  return `${importFileNames}
export default {
${exportFileNames}};`;
};

// mock模版
const getMockTemplate = (path) => {
  return (
    `const path = '${path}'

const method = 'GET'
    
const description = ''
    
const query = {
    
}
    
const response = {

}
    
module.exports = {
  path,
  method,
  description,
  query,
  response,
}
`
  )
}

module.exports = {
  getTsTemplate,
  getIndexTemplate,
  getMockTemplate
};
