import { UpdateWallet } from '@/domain/usecases'
import { UpdateWalletRepository } from '@/data/protocols'
import { BadRequestError } from '@/domain/errors'
import { WALLET_NOT_FOUND } from '@/domain/errors/messages/error-messages'
import { WalletModel } from '@/domain/models'

export class DbUpdateWallet implements UpdateWallet {
  constructor (
    private readonly updateWalletRepository: UpdateWalletRepository
  ) {}

  async update (wallet: WalletModel): Promise<WalletModel> {
    const updatedWallet = await this.updateWalletRepository.update(wallet)
    if (!updatedWallet) {
      throw new BadRequestError(WALLET_NOT_FOUND)
    }
    return updatedWallet
  }
}
