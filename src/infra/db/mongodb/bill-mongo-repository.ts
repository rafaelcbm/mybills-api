import { AddBillRepository, AddBillRepositoryParams, AddBillRepositoryResult, AddManyBillsRepository, LoadBillsByMonthRepositoryParams, LoadBillsByMonthRepositoryResult, LoadBillsByMonthRepository, LoadBillByIdRepository, LoadBillsByIdRepositoryResult, LoadBillByIdRepositoryParams } from '@/data/protocols/db'
import { AddBillParams } from '@/domain/usecases'
import { MongoHelper } from '@/infra/db'
import { ObjectId } from 'bson'
import addMonths from 'date-fns/addMonths'
import parse from 'date-fns/parse'

export class BillMongoRepository implements AddBillRepository, AddManyBillsRepository, LoadBillsByMonthRepository, LoadBillByIdRepository {
  async loadBillById(params: LoadBillByIdRepositoryParams): Promise<LoadBillsByIdRepositoryResult> {
    const billCollection = await MongoHelper.getCollection('bills')

    const result = await billCollection.findOne(
      {
        accountId: params.accountId,
        _id: new ObjectId(params.id)
      },
      { projection: { accountId: 0 } })

    return result ? MongoHelper.map(result) : result
  }

  async add(billParam: AddBillRepositoryParams): Promise<AddBillRepositoryResult> {
    const billCollection = await MongoHelper.getCollection('bills')
    const bill = await billCollection.insertOne(billParam)
    return MongoHelper.map(bill.ops[0])
  }

  async addMany(billsParam: AddBillParams[]): Promise<void> {
    const billCollection = await MongoHelper.getCollection('bills')
    await billCollection.insertMany(billsParam)
  }

  async loadBills(params: LoadBillsByMonthRepositoryParams): Promise<LoadBillsByMonthRepositoryResult[]> {
    const billCollection = await MongoHelper.getCollection('bills')

    const pattern = 'yyyy-MM'
    const dateReference = new Date(2000, 1, 1)

    const startDate = parse(params.yearMonth, pattern, dateReference)
    const endDate = addMonths(startDate, 1)
    const query = { $and: [{ accountId: new ObjectId(params.accountId) }, { date: { $gte: startDate } }, { date: { $lt: endDate } }] }
    const sort = { date: 1 }

    const result = await billCollection.find(query, { projection: { accountId: 0 } }).sort(sort).toArray()

    return MongoHelper.mapCollection(result)
  }
}
