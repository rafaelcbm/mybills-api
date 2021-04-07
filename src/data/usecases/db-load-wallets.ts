import { LoadWallets, LoadWalletsResult } from '@/domain/usecases/load-wallets'
import { LoadWalletsRepository } from '../protocols'

export class DbLoadWallets implements LoadWallets {
  constructor (
    private readonly loadWalletRepository: LoadWalletsRepository
  ) { }

  async loadAll (accountId: string): Promise<LoadWalletsResult[]> {
    const walletsDbResult = await this.loadWalletRepository.loadAll(accountId)
    return walletsDbResult.map(walletModel => {
      const { accountId, ...wallet } = walletModel
      return wallet
    })
  }
}
