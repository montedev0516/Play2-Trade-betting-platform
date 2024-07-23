import axios from 'axios'

import { getCookie } from '@/utils/cookie'

import { appiUrl } from '@/config'

export function getProfile(): Promise<any> {
  return axios.get(`${appiUrl}/profile`, {
    headers: {
      'Authorization': `Bearer ${getCookie('token')}`
    }
  });
}

export function storeSmartWalletAddress(smartWalletAddress: string): Promise<any> {
  return axios.post(`${appiUrl}/smart-wallet-address`, {
    smart_wallet_address: smartWalletAddress,
  }, {
    headers: {
      'Authorization': `Bearer ${getCookie('token')}`
    }
  });
}