import { requestGet } from '@/common/request';

export interface aParams {a:string;b:{c:string;d:number;}}


export interface aRes {ret:string;msg:string;}

//
export async function a(params: aParams): Promise<aRes> {
  return await requestGet('/request/a', params);
}