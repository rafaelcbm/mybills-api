import { AddBillRepository, AddBillRepositoryParams, AddBillRepositoryResult } from '@/data/protocols/db'
import { MongoHelper } from '@/infra/db'

export class BillMongoRepository implements AddBillRepository {
  async add (billParam: AddBillRepositoryParams): Promise<AddBillRepositoryResult> {
    const billCollection = await MongoHelper.getCollection('bills')
    const bill = await billCollection.insertOne(billParam)
    return MongoHelper.map(bill.ops[0])
  }
}
