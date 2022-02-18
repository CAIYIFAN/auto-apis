import { requestGet } from '@/common/request';

export interface aParams {}


export interface aRes {ret:string;msg:string;data:Array<{id:string;}> | [];}

//
export async function a(params: aParams): Promise<aRes> {
  return await requestGet('/request/a/a', params);
}