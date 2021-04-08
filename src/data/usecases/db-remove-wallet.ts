import { RemoveWallet } from '@/domain/usecases'
import { RemoveWalletRepository } from '@/data/protocols'
import { BadRequestError } from '@/domain/errors'
import { WALLET_NOT_FOUND } from '@/domain/errors/messages/error-messages'

export class DbRemoveWallet implements RemoveWallet {
  constructor (
    private readonly removeWalletRepository: RemoveWalletRepository
  ) {}

  async remove (walletId: string, accountId: string): Promise<void> {
    if (!await this.removeWalletRepository.remove(walletId, accountId)) {
      throw new BadRequestError(WALLET_NOT_FOUND)
    }
  }
}
