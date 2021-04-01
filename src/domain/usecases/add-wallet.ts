import { WalletModel } from '@/domain/models'

export type AddWalletParams = Omit<WalletModel, 'id'>

export interface AddWallet {
  add: (wallet: AddWalletParams) => Promise<void>

}
