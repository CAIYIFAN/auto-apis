const getTsTemplate = ({ fileName, data, config }) => {
  const getMethod = () => {
    if (data.method === 'GET') return 'requestGet';
    if (data.method === 'POST') return 'requestPost';
  };

  return `
  import { ${getMethod()} } from '${config.requestPath}';

  export interface ${fileName}Params {
  }

  export interface ${fileName}Res {
  }

  export async function ${fileName}(params: ${fileName}Params): Promise<${fileName}Res> {
    return await requestGet('${data.path}', params);
  }
  
  `;
};

module.exports = {
  getTsTemplate,
};
