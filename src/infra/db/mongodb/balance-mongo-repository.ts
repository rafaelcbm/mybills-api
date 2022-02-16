import { AddBalanceRepository, AddBalanceRepositoryParams, LoadBalanceByIdRepository, LoadBalanceByMonthRepository, LoadBalanceByMonthRepositoryParams, LoadBalanceByMonthRepositoryResult, LoadFutureBalancesRepository, LoadLastBalanceRepository, UpdateBalanceRepository, LoadBalanceByIdRepositoryParams } from '@/data/protocols/db'
import { BalanceModel } from '@/domain/models'
import { MongoHelper } from '@/infra/db'
import { ObjectId } from 'mongodb'

export class BalanceMongoRepository implements LoadBalanceByMonthRepository, AddBalanceRepository, UpdateBalanceRepository,
  LoadLastBalanceRepository, LoadFutureBalancesRepository, LoadBalanceByIdRepository {
  async loadBalanceById(params: LoadBalanceByIdRepositoryParams): Promise<BalanceModel> {
    const balanceCollection = await MongoHelper.getCollection('balances')

    const result = await balanceCollection.findOne(
      {
        accountId: params.accountId,
        _id: new ObjectId(params.id)
      },
      { projection: { accountId: 0 } })

    return result ? MongoHelper.map(result) : result
  }

  async loadBalance(params: LoadBalanceByMonthRepositoryParams): Promise<LoadBalanceByMonthRepositoryResult> {
    const billCollection = await MongoHelper.getCollection('balances')

    const result = await billCollection.findOne(
      { yearMonth: params.yearMonth, accountId: params.accountId },
      { projection: { accountId: 0 } })

    return result ? MongoHelper.map(result) : result
  }

  async add(balanceParam: AddBalanceRepositoryParams): Promise<void> {
    const balanceCollection = await MongoHelper.getCollection('balances')
    await balanceCollection.insertOne(balanceParam)
  }

  async update(balanceId: string, balanceValue: number): Promise<BalanceModel> {
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

  async loadLastBalance(accountId: string, yearMonth: string): Promise<BalanceModel> {
    const billCollection = await MongoHelper.getCollection('balances')

    const result = await billCollection.findOne(
      { $and: [{ accountId: accountId }, { yearMonth: { $lt: yearMonth } }] },
      { projection: { accountId: 0 }, sort: { yearMonth: -1 } })

    return result ? MongoHelper.map(result) : result
  }

  async loadFutureBalances(accountId: string, yearMonth: string): Promise<BalanceModel[]> {
    const billCollection = await MongoHelper.getCollection('balances')

    const result = await billCollection.find(
      { $and: [{ accountId: accountId }, { yearMonth: { $gt: yearMonth } }] },
      { projection: { accountId: 0 } }).toArray()

    return result ? MongoHelper.mapCollection(result) : result
  }
}
