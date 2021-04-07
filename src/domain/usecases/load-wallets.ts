import { WalletModel } from '@/domain/models'

export type LoadWalletsResult = WalletModel

export interface LoadWallets {
  loadAll: (accountId: string) => Promise<LoadWalletsResult[]>
}
