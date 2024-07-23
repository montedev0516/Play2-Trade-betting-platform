import axios, { AxiosResponse } from 'axios'

import { getCookie } from '@/utils/cookie'

import { appiUrl } from '@/config'
type LoginParamType = {
  email: string,
  name: string,
  wallet_address: string,
  country_code: string,
  type_of_login: string,
  avatar_url: string,
}
export function login({ email, name, wallet_address, country_code, type_of_login, avatar_url }: LoginParamType): Promise<any> {
  return axios.post(`${appiUrl}/sign-in`, {
    email,
    wallet_address,
    domain: 'https://tradeupdown.com', // TODO: TGF-51: Get domain from current browser url
    ref_id: getCookie("ref_id") || "",
    click_hash: getCookie("click_hash") || "",
    country_code,
    name,
    type_of_login,
    avatar_url
  });
}

export function verify(nonce: string | number, signature: string) {
  return axios.post(`${appiUrl}/verify`, {
    nonce,
    signature
  })
}

export async function logout(token:string | null) {
  await axios.post(`${appiUrl}/sign-out`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}
export function getLocation(): Promise<AxiosResponse<any, any>> {
  return axios.get(`${appiUrl}/location`);
}