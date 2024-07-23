import {
  WalletClientSigner,
  type SmartAccountAuthenticator
} from "@alchemy/aa-core";
import { Web3AuthNoModal } from '@web3auth/no-modal'
import {
  createWalletClient,
  custom,
  SignableMessage,
  TypedData,
  TypedDataDefinition,
  type Hex,
  type Hash
} from "viem";
import type { UserInfo } from "@web3auth/base";

interface Web3AuthNoModalAuthenticationParams {
  authenticate: () => Promise<Partial<UserInfo>>;
}

export class Web3AuthSigner implements SmartAccountAuthenticator<
  Web3AuthNoModalAuthenticationParams,
  Partial<UserInfo>,
  Web3AuthNoModal
>
{
  inner: Web3AuthNoModal;
  private signer: WalletClientSigner | undefined;

  constructor(params: { inner: Web3AuthNoModal }) {
    this.inner = params.inner;
  }

  readonly signerType = 'aa-signers:web3auth';

  getAddress = async () => {
    if (!this.signer) throw new Error("Not authenticated");

    const address = await this.signer.getAddress();
    if (address == null) throw new Error("No address found");

    return address as Hash;
  };

  signMessage = async (msg: SignableMessage) => {
    if (!this.signer) throw new Error("Not authenticated");
    return this.signer.signMessage(msg);
  };

  signTypedData: <
    const TTypedData extends TypedData | { [key: string]: unknown },
    TPrimaryType extends string = string
  >(
    params: TypedDataDefinition<TTypedData, TPrimaryType>
  ) => Promise<Hex> = async (params) => {
    if (!this.signer) throw new Error("Not authenticated");
    return this.signer.signTypedData(params);
  };

  authenticate = async () => {
    if (this.inner.provider == null) throw new Error("No provider found");

    this.signer = new WalletClientSigner(
      createWalletClient({
        transport: custom(this.inner.provider)
      }),
      this.signerType
    );

    return this.inner.getUserInfo();
  };

  getAuthDetails = async () => {
    if (!this.signer) throw new Error("Not authenticated");

    return this.inner.getUserInfo();
  };
}