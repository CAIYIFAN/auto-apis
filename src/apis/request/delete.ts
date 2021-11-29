import { requestGet } from '@/common/request';

export interface _deleteParams {}


export interface _deleteRes {ret:string;msg:string;}

//
export async function _delete(params: _deleteParams): Promise<_deleteRes> {
  return await requestGet('/request/a', params);
}