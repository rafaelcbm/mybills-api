
import { DbRemoveWallet } from '@/data/usecases'
import { RemoveWallet } from '@/domain/usecases'
import { WalletMongoRepository } from '@/infra/db'

export const makeDbRemoveWallet = (): RemoveWallet => {
  const walletMongoRepository = new WalletMongoRepository()
  return new DbRemoveWallet(walletMongoRepository)
}
