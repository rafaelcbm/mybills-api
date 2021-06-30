import { AddBalanceRepository, AddBalanceRepositoryParams, LoadBalanceByMonthRepository, LoadBalanceByMonthRepositoryParams, LoadBalanceByMonthRepositoryResult, UpdateBalanceRepository } from '@/data/protocols/db'
import { BalanceModel } from '@/domain/models'
import { MongoHelper } from '@/infra/db'
import { ObjectId } from 'mongodb'

export class BalanceMongoRepository implements LoadBalanceByMonthRepository, AddBalanceRepository, UpdateBalanceRepository {
  async loadBalance (params: LoadBalanceByMonthRepositoryParams): Promise<LoadBalanceByMonthRepositoryResult> {
    const billCollection = await MongoHelper.getCollection('balances')

    const result = await billCollection.findOne(
      { yearMonth: params.yearMonth , accountId: params.accountId },
      { projection: { accountId: 0 } })

    return result ? MongoHelper.map(result) : result
  }

  async add (balanceParam: AddBalanceRepositoryParams): Promise<void> {
    const balanceCollection = await MongoHelper.getCollection('balances')
    await balanceCollection.insertOne(balanceParam)
  }

  async update (balanceId: string, balanceValue: number): Promise<BalanceModel> {
    const balanceCollection = await MongoHelper.getCollection('balances')
    const updatedBalance = await balanceCollection.findOneAndUpdate(
      {
        _id: new ObjectId(balanceId)
      }, {
        $set: {
          balance: balanceValue
        }
      }, {
        returnOriginal: false
      })

    if (updatedBalance.ok && updatedBalance.value) {
      return MongoHelper.map(updatedBalance.value)
    }
  }
}
