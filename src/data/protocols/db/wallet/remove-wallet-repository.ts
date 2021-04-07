import { WalletModel } from '@/domain/models'

export type RemoveWalletRepositoryResult = WalletModel

export interface RemoveWalletRepository {
  remove: (walletId: string, accountId: string) => Promise<RemoveWalletRepositoryResult>
}
