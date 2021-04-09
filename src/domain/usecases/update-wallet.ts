import { WalletModel } from '@/domain/models'

export interface UpdateWallet {
  update: (updateWalletParams: WalletModel) => Promise<WalletModel>
}
