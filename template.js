const getTsTemplate = (fileName, filePath) => {
  return (`
  import { requestGet, requestPost } from '@/common/request';

  export interface ${fileName}Params {
  }

  export interface ${fileName}Res {
  }

  export async function ${fileName}(params: ${fileName}Params): Promise<${fileName}Res> {
    return await requestGet('${filePath}', params);
  }
  
  `)
}

module.exports = {
  getTsTemplate
}
