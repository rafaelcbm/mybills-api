import { WalletModel } from '@/domain/models'

export type UpdateWalletRepositoryParams = WalletModel
export type UpdateWalletRepositoryResult = WalletModel

export interface UpdateWalletRepository {
  update: (updateWalletRepositoryParams: UpdateWalletRepositoryParams) => Promise<UpdateWalletRepositoryResult>
}
