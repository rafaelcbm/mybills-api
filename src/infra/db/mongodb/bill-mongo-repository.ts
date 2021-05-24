import { AddBillRepository, AddBillRepositoryParams, AddBillRepositoryResult, AddManyBillsRepository } from '@/data/protocols/db'
import { AddBillParams } from '@/domain/usecases'
import { MongoHelper } from '@/infra/db'

export class BillMongoRepository implements AddBillRepository, AddManyBillsRepository {
  async add (billParam: AddBillRepositoryParams): Promise<AddBillRepositoryResult> {
    const billCollection = await MongoHelper.getCollection('bills')
    const bill = await billCollection.insertOne(billParam)
    return MongoHelper.map(bill.ops[0])
  }

  async addMany (billsParam: AddBillParams[]): Promise<void> {
    const billCollection = await MongoHelper.getCollection('bills')
    await billCollection.insertMany(billsParam)
  }
}
