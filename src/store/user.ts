import { defineStore } from 'pinia'

import { deleteCookie, getCookie, setCookie } from '@/utils/cookie'
import { login, verify, logout, getLocation } from '@/api/auth'
import { getProfile } from '@/api/user'

import { web3AuthGetUserInfo, type Web3UserInfo } from '@/composables/useWeb3Auth'
import { signerGetWalletAddress, signerSignMessage } from '@/composables/useSigner'
import { smartWalletAddress, smartWalletGetAddress, smartWalletBalance } from '@/composables/useSmartWallet'

interface Web3AuthUserData extends Web3UserInfo {
    email: string;
}

interface AuthData {
    user_id: number;
    nonce: string;
}

interface VerifiedData {
    token: string,
    user: {
        id: number,
        wallet_address: string
    }
}

const isWeb3AuthProvidesEmail = (userInfo: Web3UserInfo): userInfo is Web3AuthUserData => !!userInfo?.email

export const useUserStore = defineStore('AuthStore', {
    state: () => ({
        web3AuthUserData: null as Web3AuthUserData | null,
        signerWalletAddress: null as string | null,
        authData: null as AuthData | null,
        verifiedData: null as VerifiedData | null,
        profile: null as any,
        authStarted: false,
        avatar_url: `https://robohash.org/${Date.now()}`
    }),

    getters: {
        isLoggedIn: (state) => !!state.profile?.id,

        signerWalletAddressShort: (state) => {
            if (!state.signerWalletAddress) return null

            const firstPart = state.signerWalletAddress.substring(0, 4)
            const lastPart = state.signerWalletAddress.substring(
                state.signerWalletAddress.length - 4, state.signerWalletAddress.length
            )

            return `${firstPart}...${lastPart}`
        },
    },

    actions: {
        authStart() {
            this.authStarted = true
        },
        authEnd() {
            this.authStarted = false
        },
        async getProfile() {
            try {
                const res = await getProfile();

                this.profile = res.data
                if (res.data?.avatar_url) {
                    this.avatar_url = res.data.avatar_url
                } else {
                    this.avatar_url = `https://robohash.org/${Date.now()}`
                }
            } catch (error) {
                console.error('Get profile error:', error);
            }
        },

        async getWeb3AuthUserData() {
            try {
                const res = await web3AuthGetUserInfo()

                if (!isWeb3AuthProvidesEmail(res)) {
                    console.error('get web3Auth user data error: email not provided')
                    return
                }

                this.web3AuthUserData = res

            } catch (error) {
                console.error('web3auth get user info error:', error);
            }
        },

        async getSignerWalletAddress() {
            try {
                const res = await signerGetWalletAddress()

                if (!res) {
                    console.error('smart wallet get address error: wallet address not provided')
                    return
                }

                this.signerWalletAddress = res

            } catch (error) {
                console.error('signer get wallet address error', error);
            }
        },

        async getSmartWalletAddress() {
            try {
                const res = await smartWalletGetAddress()

                if (!res) {
                    console.error('signer get wallet address error: wallet address not provided')
                    return
                }

                smartWalletAddress.value = res

            } catch (error) {
                console.error('signer get wallet address error', error);
            }
        },

        async login() {
            if (!this.web3AuthUserData?.email) {
                console.error('Login error: web3Auth email is empty');
                return
            }
            if (!this.web3AuthUserData?.name) {
                console.error('Login error: web3Auth name is empty');
                return
            }

            if (!this.signerWalletAddress) {
                console.error('Login error: signer wallet address is empty');
                return
            }

            try {
                const resLocation = await getLocation()
                const countryCode = resLocation.data.country_code as string
                const res = await login({
                    email: this.web3AuthUserData.email,
                    name: this.web3AuthUserData.name,
                    wallet_address: this.signerWalletAddress,
                    country_code: countryCode,
                    type_of_login: this.web3AuthUserData.typeOfLogin || "",
                    avatar_url: this.web3AuthUserData.profileImage || `https://dev-backend.tradeupdown.com/dicebear/7.x/initials/svg?seed=${this.web3AuthUserData.name}`
                })

                this.authData = res.data
            } catch (error) {
                console.error('Login error:', error);
            }
        },

        async verify() {
            if (!this.authData?.user_id) return

            if (!this.authData?.nonce) {
                console.error('Verification error: nonce is empty');
                return;
            }

            const signature = await signerSignMessage(this.authData.nonce)

            if (!signature) {
                console.error('Verification error: signature is empty');
                return;
            }

            try {
                const res = await verify(this.authData.nonce, signature);

                this.verifiedData = res.data

                if (!res.data.access) {
                    console.error('Verification error: token not created');
                    return;
                }

                setCookie('token', res.data.access, 7)
            } catch (error) {
                console.error('Verification error:', error);
            }
        },

        async logout() {
            try {
                const token = getCookie("token")
                deleteCookie('token')
                await logout(token);
                this.web3AuthUserData = null;
                this.signerWalletAddress = null;
                smartWalletAddress.value = null;
                smartWalletBalance.value = null;
                this.authData = null;
                this.profile = null
                this.avatar_url = `https://robohash.org/${Date.now()}`
            } catch (error) {
                console.error('Logout error:', error);
            }
        },
    },
})
