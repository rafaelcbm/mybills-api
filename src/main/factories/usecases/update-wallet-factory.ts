
import { DbUpdateWallet } from '@/data/usecases'
import { UpdateWallet } from '@/domain/usecases'
import { WalletMongoRepository } from '@/infra/db'

export const makeDbUpdateWallet = (): UpdateWallet => {
  const walletMongoRepository = new WalletMongoRepository()
  return new DbUpdateWallet(walletMongoRepository)
}
