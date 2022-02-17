import { requestGet } from '@/common/request';

export interface fParams {}


export interface fRes {ret:string;}

//
export async function f(params: fParams): Promise<fRes> {
  return await requestGet('/request/f', params);
}