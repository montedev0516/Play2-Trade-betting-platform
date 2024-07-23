import { ref } from 'vue'
import { createModularAccountAlchemyClient } from '@alchemy/aa-alchemy';
import { ethers, Contract } from 'ethers';
import { encodeFunctionData, parseUnits, formatEther } from 'viem';
import { storeSmartWalletAddress } from '@/api/user'
import { SmartAccountSigner, SmartAccountClient, SendUserOperationParameters, SmartContractAccount } from '@alchemy/aa-core';

import { signer } from '@/composables/useSigner'

import {
  apiKey,
  chain,
  tokenAddress,
  contractAddress,
  allowanceAmount,
  tokenDecimals,
  gasManagerPolicyId,
  poolId,
  defaultBetAmount,
} from '@/config'
import erc20Abi from '@/abis/abi-erc20.json';
import tradeAbi from '@/abis/abi-trade.json';

// Constants

let smartWalletProvider: SmartAccountClient | null = null
let tokenContract: Contract | null = null
let ethersProvider: ethers.providers.AlchemyProvider | null = null
let getBalanceInterval = ref<NodeJS.Timeout | null>(null)

// State

const selectedBetAmount = ref<number>(defaultBetAmount)
const smartWalletAddress = ref<string | null>(null)
const smartWalletBalance = ref<string | null>(null)

// Functions

const smartWalletInit = async () => {
  if (signer === null) {
    console.error('smart account init error: signer not initialized');
    return
  }

  try {
    smartWalletProvider = await createModularAccountAlchemyClient({
      apiKey,
      chain,
      signer: signer as SmartAccountSigner,
      gasManagerConfig: {
        policyId: gasManagerPolicyId,
      },
      opts: {
        feeOptions: {
          maxFeePerGas: { multiplier: 1.5 },
          maxPriorityFeePerGas: { multiplier: 1.25 },
        },
      }
    });

    console.log('smartWalletProvider:', smartWalletProvider)
    console.log("address", await smartWalletProvider.account?.address)

    ethersProvider = new ethers.providers.AlchemyProvider(chain.id, apiKey);
    tokenContract = new ethers.Contract(tokenAddress, erc20Abi, ethersProvider)

    console.log('tokenContract:', tokenContract)
    console.log('ethersProvider:', ethersProvider)
    
  } catch (error) {
    console.error('smart account init error:', error);
    return
  }
}

const smartWalletGetAddress = async () => {
  if (!smartWalletProvider) {
    console.error('smart wallet get address error: smart wallet provider not initialized');
    return
  }
  const address = await smartWalletProvider.account?.address
  return address
}

const smartWalletSynchAllowance = async () => {
  const allowance = await smartWalletGetAllowance()

  if (allowance === '0') await smartWalletSetAllowance()
}

const smartWalletGetAllowance = async () => {
  try {
    if (!tokenContract) {
      console.error('smart wallet get allowance error: token contract not initialized');
      return
    }

    const allowance = await tokenContract.allowance(smartWalletAddress.value, contractAddress)
    console.log('allowance:', allowance.toString())

    if (!allowance) {
      console.error('smart wallet get allowance error: no allowance provided');
      return
    }

    return allowance.toString()
  } catch (error) {
    console.error('smart wallet get allowance error:', error);
  }
}

const smartWalletSetAllowance = async () => {
  if (!smartWalletProvider) {
    console.error('smart wallet init token contract error: smart wallet provider not initialized');
    return
  }

  try {
    const callData = encodeFunctionData({
      abi: erc20Abi,
      functionName: 'approve',
      args: [contractAddress, parseUnits(String(allowanceAmount), tokenDecimals)],
    });

    await smartWalletProvider.sendUserOperation({
      uo: {
        target: tokenAddress,
        data: callData,
      },
    } as SendUserOperationParameters<SmartContractAccount | undefined>);
  } catch (error) {
    console.error('smart wallet set allowance error:', error);
  }
}

const smartWalletSendSmartWalletAddress = async () => {
  if (!smartWalletAddress.value) {
    console.error('store smart wallet address error: smart wallet address is empty');
    return
  }

  try {
    await storeSmartWalletAddress(smartWalletAddress.value)
  } catch (error) {
    console.error('store smart wallet address error:', error)
  }
}

const smartWalletGetBalance = async () => {
  if (!smartWalletProvider) {
    console.error('smart wallet get balance error: snart wallet provider not initialized');
    return
  }

  if (!ethersProvider) {
    console.error('smart wallet get balance error: ethers provider not initialized');
    return
  }

  if (!smartWalletAddress.value) {
    console.error('smart wallet get balance error: smart wallet address is empty');
    return
  }

  if (!tokenContract) {
    console.error('smart wallet get balance error: token contract not initialized');
    return
  }

  if(getBalanceInterval.value)clearInterval(getBalanceInterval.value)

  getBalanceInterval.value = null

  smartWalletBalance.value = formatEther(
    (await tokenContract.balanceOf(smartWalletAddress.value)).toBigInt()

  );

  getBalanceInterval.value = setInterval(smartWalletGetBalance, 3000)
};

const smartWalletMakeTrade = async (isUp: boolean) => {
  if (!smartWalletProvider) {
    console.error('make trade error: smart wallet provider not initialized');
    return
  }

  if (!ethersProvider) {
    console.error('make trade error: ethers provider not initialized');
    return
  }

  if (!smartWalletAddress.value) {
    console.error('smart wallet get balance error: smart wallet address is empty');
    return
  }

  try {
    const tradeData = {
      poolId: poolId,
      upOrDown: isUp,
      bet: parseUnits(String(selectedBetAmount.value), tokenDecimals),
    };

    const uoMakeTradeData = encodeFunctionData({
      abi: tradeAbi,
      functionName: 'makeTrade',
      args: [tradeData],
    });

    const nonce = await ethersProvider.getTransactionCount(smartWalletAddress.value, 'pending') + 1;
    console.log('nonce:', nonce)

    const { hash: txHash } = await smartWalletProvider.sendUserOperation({
      uo: {
        target: contractAddress,
        data: uoMakeTradeData,
      }
    } as SendUserOperationParameters<SmartContractAccount | undefined>);
    console.time('Transaction Time');
    console.log('txHash:', txHash);

    const txReceipt = await smartWalletProvider.waitForUserOperationTransaction({ hash: txHash });
    
    console.log('txReceipt:', txReceipt);
    console.timeEnd('Transaction Time');

    smartWalletGetBalance()
  } catch (error) {
    console.error('Make trade error:', error)
  }
}

export {
  selectedBetAmount,
  smartWalletAddress,
  smartWalletBalance,
  smartWalletInit,
  smartWalletGetAddress,
  smartWalletGetAllowance,
  smartWalletSynchAllowance,
  smartWalletSendSmartWalletAddress,
  smartWalletGetBalance,
  smartWalletMakeTrade,
}
