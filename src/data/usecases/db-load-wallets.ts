import { LoadWallets, LoadWalletsResult } from '@/domain/usecases/load-wallets'
import { LoadWalletsRepository } from '../protocols'

export class DbLoadWallets implements LoadWallets {
  constructor (
    private readonly loadWalletRepository: LoadWalletsRepository
  ) { }

  async loadAll (accountId: string): Promise<LoadWalletsResult[]> {
    return this.loadWalletRepository.loadAll(accountId)
  }
}
