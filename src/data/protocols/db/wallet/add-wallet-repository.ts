import { AddWalletParams } from '@/domain/usecases/add-wallet'

export type AddWalletRepositoryParams = AddWalletParams

export interface AddWalletRepository {
  add: (walletParam: AddWalletRepositoryParams) => Promise<void>
}
