import { Web3AuthSigner } from '@/utils/signer';

import { web3auth } from '@/composables/useWeb3Auth'


// State

let signer: Web3AuthSigner | null = null

// Functions

const signerInit = async () => {
  if (web3auth === null) {
    console.error('signer init error: web3Auth not initialized');
    return
  }

  try {
    signer = new Web3AuthSigner({ inner: web3auth });
  } catch (error) {
    console.error('signer init error:', error);
  }

  if (!signer) {
    console.error('signer init error: signer not initialized');
    return
  }

  try {
    await signer.authenticate();
  } catch (error) {
    console.error('Signer: cannot authenticate', error);
  }
};

const signerGetWalletAddress = () => {
  if (!signer) {
    console.error('signer get wallet address error: signer not initialized');
    return
  }

  return signer.getAddress()
}

const signerSignMessage = async (nonce: string) => {
  if (!signer) {
    console.error('signer sign message error: signer not initialized');
    return
  }

  return signer.signMessage(nonce)
};

export { signer, signerInit, signerGetWalletAddress, signerSignMessage }
