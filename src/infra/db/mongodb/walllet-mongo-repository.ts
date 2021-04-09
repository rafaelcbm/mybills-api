import { AddWalletRepository, AddWalletRepositoryParams, LoadWalletRepositoryResult, LoadWalletsRepository, RemoveWalletRepository, UpdateWalletRepository, UpdateWalletRepositoryParams, UpdateWalletRepositoryResult } from '@/data/protocols/db'
import { WalletModel } from '@/domain/models'
import { MongoHelper } from '@/infra/db'
import { ObjectId } from 'mongodb'

export class WalletMongoRepository implements AddWalletRepository, LoadWalletsRepository, RemoveWalletRepository, UpdateWalletRepository {
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
    const removedWallet = await walletCollection.findOneAndDelete({ _id: new ObjectId(id), accountId })

    if (removedWallet.ok && removedWallet.value) {
      return MongoHelper.map(removedWallet.value)
    }
  }

  async update (updateWalletRepositoryParams: UpdateWalletRepositoryParams): Promise<UpdateWalletRepositoryResult> {
    const walletCollection = await MongoHelper.getCollection('wallets')
    const updatedWallet = await walletCollection.findOneAndUpdate(
      {
        _id: new ObjectId(updateWalletRepositoryParams.id),
        accountId: new ObjectId(updateWalletRepositoryParams.accountId)
      }, {
        $set: {
          name: updateWalletRepositoryParams.name
        }
      }, {
        returnOriginal: false
      })

    if (updatedWallet.ok && updatedWallet.value) {
      return MongoHelper.map(updatedWallet.value)
    }
  }
}
