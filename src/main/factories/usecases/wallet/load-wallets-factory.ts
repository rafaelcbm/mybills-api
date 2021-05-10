import { DbLoadWallets } from '@/data/usecases'
import { LoadWallets } from '@/domain/usecases/wallet/load-wallets'
import { WalletMongoRepository } from '@/infra/db'

export const makeDbLoadWallets = (): LoadWallets => {
  const walletMongoRepository = new WalletMongoRepository()
  return new DbLoadWallets(walletMongoRepository)
}
