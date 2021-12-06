import { requestGet } from '@/common/request';

export interface dParams {}


export interface dRes {ret:string;msg:string;}

//
export async function d(params: dParams): Promise<dRes> {
  return await requestGet('/request/d', params);
}