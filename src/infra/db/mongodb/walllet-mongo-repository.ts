import { AddWalletRepository, AddWalletRepositoryParams } from '@/data/protocols/db'
import { MongoHelper } from '@/infra/db'

export class WalletMongoRepository implements AddWalletRepository {
  async add (walletParam: AddWalletRepositoryParams): Promise<void> {
    const walletCollection = await MongoHelper.getCollection('wallets')
    await walletCollection.insertOne(walletParam)
  }
}
