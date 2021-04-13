import { AddWalletParams } from '@/domain/usecases'

export type AddWalletRepositoryParams = AddWalletParams

export interface AddWalletRepository {
  add: (walletParam: AddWalletRepositoryParams) => Promise<void>
}
