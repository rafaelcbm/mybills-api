import { WalletModel } from '@/domain/models'

export type LoadWalletsResult = Omit<WalletModel, 'accountId'>

export interface LoadWallets {
  loadAll: (accountId: string) => Promise<LoadWalletsResult[]>
}
