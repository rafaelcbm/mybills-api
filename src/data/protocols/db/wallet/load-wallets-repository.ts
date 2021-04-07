import { LoadWalletsResult } from '@/domain/usecases/load-wallets'

export type LoadWalletRepositoryResult = LoadWalletsResult

export interface LoadWalletsRepository {
  loadAll: (accountId: string) => Promise<LoadWalletRepositoryResult[]>
}
