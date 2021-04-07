import { AddWalletRepository, AddWalletRepositoryParams, LoadWalletsRepository, LoadWalletRepositoryResult } from '@/data/protocols/db'
import { MongoHelper } from '@/infra/db'

export class WalletMongoRepository implements AddWalletRepository, LoadWalletsRepository {
  async add (walletParam: AddWalletRepositoryParams): Promise<void> {
    const walletCollection = await MongoHelper.getCollection('wallets')
    await walletCollection.insertOne(walletParam)
  }

  async loadAll (accountId: string): Promise<LoadWalletRepositoryResult[]> {
    const walletCollection = await MongoHelper.getCollection('wallets')
    const wallets = await walletCollection.find({ accountId }).toArray()
    return MongoHelper.mapCollection(wallets)
  }
}
