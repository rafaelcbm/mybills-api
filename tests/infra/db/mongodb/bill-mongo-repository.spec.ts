import { BillMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddBillRepositoryParams } from '@/tests/data/mocks'
import { Collection } from 'mongodb'

let billsCollection: Collection
let accountCollection: Collection

const makeSut = (): BillMongoRepository => {
  return new BillMongoRepository()
}

// const mockAccountId = async (): Promise<string> => {
//   const res = await accountCollection.insertOne(mockAddAccountParams())
//   return res.ops[0]._id
// }

describe('BillMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    billsCollection = await MongoHelper.getCollection('bills')
    await billsCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a bills on success', async () => {
      const sut = makeSut()
      const billParam = mockAddBillRepositoryParams()

      const savedBill = await sut.add(billParam)

      const count = await billsCollection.countDocuments()
      expect(count).toBe(1)
      expect(savedBill.id).toBeTruthy()
      expect(savedBill.accountId).toEqual(billParam.accountId)
      expect(savedBill.walletId).toEqual(billParam.walletId)
      expect(savedBill.categoryId).toEqual(billParam.categoryId)
      expect(savedBill.description).toEqual(billParam.description)
      expect(savedBill.date).toEqual(billParam.date)
      expect(savedBill.value).toEqual(billParam.value)
      expect(savedBill.isDebt).toEqual(billParam.isDebt)
      expect(savedBill.note).toEqual(billParam.note)
      expect(savedBill.periodicity).toEqual(billParam.periodicity)
    })
  })
})
