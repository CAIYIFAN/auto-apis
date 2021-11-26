import { requestGet } from '@/common/request';

export interface bParams {"ret":"string";"msg":"string";}


export interface bRes {
  "ret":"string";
  "msg":"string";
}

//
export async function b(params: bParams): Promise<bRes> {
  return await requestGet('/request/a', params);
}