import { ModuleClient } from '@/modules/shared';
import {
  Nft,
  FindNftParams,
  findNft,
  CreateNftParams,
  createNft,
  updateNft,
  UpdateNftParams,
  UpdateNftResult,
} from '@/modules/nfts';
import { tryOrNull } from '@/utils';
import { ConfirmOptions } from '@solana/web3.js';

export class NftClient extends ModuleClient {
  async createNft(params: CreateNftParams, confirmOptions?: ConfirmOptions): Promise<Nft> {
    const { mint } = await createNft(this.metaplex, params, confirmOptions);

    return this.findNft({ mint: mint.publicKey });
  }

  async findNft(params: FindNftParams): Promise<Nft> {
    return findNft(this.metaplex, params);
  }

  async tryFindNft(params: FindNftParams): Promise<Nft | null> {
    return tryOrNull(() => this.findNft(params));
  }

  async updateNft(nft: Nft, params: UpdateNftParams): Promise<Nft> {
    await updateNft(this.metaplex, nft, params);

    return this.findNft({ mint: nft.mint });
  }
}
