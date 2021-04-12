import { DbAddWallet } from '@/data/usecases'
import { AddWallet } from '@/domain/usecases'
import { WalletMongoRepository } from '@/infra/db'

export const makeDbAddWallet = (): AddWallet => {
  const walletMongoRepository = new WalletMongoRepository()
  return new DbAddWallet(walletMongoRepository)
}
