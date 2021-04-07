import { WalletModel } from '@/domain/models'

export type LoadWalletRepositoryResult = WalletModel

export interface LoadWalletsRepository {
  loadAll: (accountId: string) => Promise<LoadWalletRepositoryResult[]>
}
