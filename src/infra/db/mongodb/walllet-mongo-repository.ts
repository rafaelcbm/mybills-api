import { AddWalletRepository, AddWalletRepositoryParams, LoadWalletsRepository, LoadWalletRepositoryResult, RemoveWalletRepository } from '@/data/protocols/db'
import { WalletModel } from '@/domain/models'
import { MongoHelper } from '@/infra/db'

export class WalletMongoRepository implements AddWalletRepository, LoadWalletsRepository, RemoveWalletRepository {
  async add (walletParam: AddWalletRepositoryParams): Promise<void> {
    const walletCollection = await MongoHelper.getCollection('wallets')
    await walletCollection.insertOne(walletParam)
  }

  async loadAll (accountId: string): Promise<LoadWalletRepositoryResult[]> {
    const walletCollection = await MongoHelper.getCollection('wallets')
    const wallets = await walletCollection.find({ accountId }).toArray()
    return MongoHelper.mapCollection(wallets)
  }

  async remove (id: string, accountId: string): Promise<WalletModel> {
    const walletCollection = await MongoHelper.getCollection('wallets')
    const removedWallet = await walletCollection.findOneAndDelete({ id, accountId })
    if (removedWallet) {
      return MongoHelper.map(removedWallet)
    }
  }
}
