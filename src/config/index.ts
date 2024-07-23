import { polygon, polygonMumbai } from 'viem/chains';
import { numberToHex } from 'viem';
import { OPENLOGIN_NETWORK } from "@toruslabs/openlogin-utils";
import { CHAIN_NAMESPACES } from '@web3auth/base'
import { Network } from "alchemy-sdk";

export const isProd = import.meta.env.VITE_APP_IS_MAINNET == 'true' ? true : false;
export const appiUrl = import.meta.env.VITE_API_URL
export const wsUrl = import.meta.env.VITE_API_WS_HOST

export const sentryDsn = import.meta.env.VITE_APP_SENTRY_DSN
export const sentryTracesSampleRate = Number(import.meta.env.VITE_APP_SENTRY_TRACES_SAMPLE_RATE)
export const sentryEnvironmentTag = import.meta.env.VITE_APP_SENTRY_ENVIRONMENT_TAG

export const rpcUrl = import.meta.env.VITE_APP_RPC_URL
export const apiKey = import.meta.env.VITE_APP_ALCHEMY_API_KEY
export const clientId = import.meta.env.VITE_APP_CLIENT_ID
export const factoryAddress = import.meta.env.VITE_APP_FACTORY_ADDRESS
export const web3AuthNetwork = isProd ? OPENLOGIN_NETWORK.SAPPHIRE_MAINNET : OPENLOGIN_NETWORK.SAPPHIRE_DEVNET
export const chain = {
  ...(isProd ? polygon : polygonMumbai),
  rpcUrls: {
    ...polygonMumbai.rpcUrls,
    default: {
      http: [rpcUrl],
    },
    public: {
      http: [rpcUrl],
    },
    alchemy: {
      http: [rpcUrl],
    },
  },
  network: isProd ? Network.MATIC_MAINNET : Network.MATIC_MUMBAI,
}
export const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: numberToHex(chain.id),
  rpcTarget: `${rpcUrl}/${apiKey}`,
  displayName: chain.name,
  blockExplorer: chain.blockExplorers.default.url,
  ticker: chain.nativeCurrency.symbol,
  tickerName: chain.nativeCurrency.name,
}
export const allowanceAmount = Number(import.meta.env.VITE_APP_ALLOWANCE_AMOUNT)
export const tokenAddress = import.meta.env.VITE_APP_TOKEN_ADDRESS
export const contractAddress = import.meta.env.VITE_APP_CONTRACT_ADDRESS
export const tokenDecimals = import.meta.env.VITE_APP_TOKEN_DECIMALS
export const gasManagerPolicyId = import.meta.env.VITE_APP_GAS_MANAGER_POLICY_ID
export const betAmounts: number[] = import.meta.env.VITE_APP_BET_AMOUNTS.split(',').map((betAmount: string) => Number(betAmount))
export const defaultBetAmount = Number(import.meta.env.VITE_APP_DEFAULT_BET_AMOUNT)
export const poolId = import.meta.env.VITE_APP_POOL_ID
