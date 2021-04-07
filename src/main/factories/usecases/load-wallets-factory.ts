import { DbLoadWallets } from '@/data/usecases/db-load-wallets'
import { LoadWallets } from '@/domain/usecases/load-wallets'
import { WalletMongoRepository } from '@/infra/db'

export const makeDbLoadWallets = (): LoadWallets => {
  const walletMongoRepository = new WalletMongoRepository()
  return new DbLoadWallets(walletMongoRepository)
}
