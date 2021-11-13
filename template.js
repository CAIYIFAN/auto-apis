const getTsTemplate = ({ fileName, data, config }) => {
  const getMethod = () => {
    if (data.method === 'GET') return 'requestGet';
    if (data.method === 'POST') return 'requestPost';
  };

  return `import { ${getMethod()} } from '${config.requestPath}';

export interface ${fileName}Params {
}

export interface ${fileName}Res {
}

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

module.exports = {
  getTsTemplate,
  getIndexTemplate,
};
