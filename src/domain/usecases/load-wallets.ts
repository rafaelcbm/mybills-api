import { WalletModel } from '@/domain/models'

export type LoadWalletsResult = Omit<WalletModel, 'id'>

export interface LoadWallets {
  loadAll: (accountId: string) => Promise<LoadWalletsResult[]>
}
