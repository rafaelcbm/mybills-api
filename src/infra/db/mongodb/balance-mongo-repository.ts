import { LoadBalanceByMonthRepository, LoadBalanceByMonthRepositoryParams, LoadBalanceByMonthRepositoryResult } from '@/data/protocols/db'
import { MongoHelper } from '@/infra/db'

export class BalanceMongoRepository implements LoadBalanceByMonthRepository {
  async loadBalance (params: LoadBalanceByMonthRepositoryParams): Promise<LoadBalanceByMonthRepositoryResult> {
    const billCollection = await MongoHelper.getCollection('balances')

    const result = await billCollection.findOne(
      { yearMonth: params.yearMonth , accountId: params.accountId },
      { projection: { accountId: 0 } })

    return result ? MongoHelper.map(result) : result
  }
}