import { LoadBillByIdRepositoryParams, LoadBillsByMonthRepositoryParams } from '@/data/protocols'
import { BillMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddBillRepositoryParams } from '@/tests/data/mocks'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { Collection } from 'mongodb'
import FakeObjectId from 'bson-objectid'

let billsCollection: Collection
let accountCollection: Collection

const makeSut = (): BillMongoRepository => {
  return new BillMongoRepository()
}

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  return res.ops[0]._id
}

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
    test('Should add a bill on success', async () => {
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
      expect(savedBill.isPaid).toEqual(billParam.isPaid)
      expect(savedBill.note).toEqual(billParam.note)
      expect(savedBill.periodicity).toEqual(billParam.periodicity)
    })
  })

  describe('addMany()', () => {
    test('Should add bills on success', async () => {
      const sut = makeSut()
      const billsParam = [mockAddBillRepositoryParams(), mockAddBillRepositoryParams()]

      await sut.addMany(billsParam)

      const count = await billsCollection.countDocuments()
      expect(count).toBe(2)
    })
  })

  describe('loadBills()', () => {
    test('Should load bills from specific month parameter', async () => {
      const sut = makeSut()
      const accountId = await mockAccountId()
      const date1 = new Date(2021, 4, 10) // Month zero based
      const date2 = new Date(2021, 3, 20)
      const date3 = new Date(2021, 4, 30)
      const billParam1 = mockAddBillRepositoryParams(accountId, date1)
      const billParam2 = mockAddBillRepositoryParams(accountId, date2)
      const billParam3 = mockAddBillRepositoryParams(accountId, date3)

      await billsCollection.insertMany([billParam1, billParam2, billParam3])

      const count = await billsCollection.countDocuments()
      expect(count).toBe(3)

      const params: LoadBillsByMonthRepositoryParams = { accountId, yearMonth: '2021-05' }

      const billsResult = await sut.loadBills(params)

      expect(billsResult.length).toBe(2)
      expect(billsResult[0].id).toBeTruthy()
      expect(billsResult[0]).not.toHaveProperty('accountId')
      expect(billsResult[0].walletId).toEqual(billParam1.walletId)
      expect(billsResult[0].categoryId).toEqual(billParam1.categoryId)
      expect(billsResult[0].description).toEqual(billParam1.description)
      expect(billsResult[0].date).toEqual(billParam1.date)
      expect(billsResult[0].value).toEqual(billParam1.value)
      expect(billsResult[0].isDebt).toEqual(billParam1.isDebt)
      expect(billsResult[0].isPaid).toEqual(billParam1.isPaid)
      expect(billsResult[0].note).toEqual(billParam1.note)
      expect(billsResult[0].periodicity).toEqual(billParam1.periodicity)
    })
  })

  describe('loadBillById()', () => {
    test('Should load a balance by id from valid parameters', async () => {
      const sut = makeSut()
      const accountId = await mockAccountId()

      const billParam = mockAddBillRepositoryParams(accountId)
      const savedBill = await sut.add(billParam)

      const count = await billsCollection.countDocuments()
      expect(count).toBe(1)

      const params: LoadBillByIdRepositoryParams = { accountId, id: savedBill.id }

      const billResult = await sut.loadBillById(params)

      expect(billResult.id).toBeTruthy()
      expect(billResult).not.toHaveProperty('accountId')
      expect(billResult.walletId).toEqual(billParam.walletId)
      expect(billResult.categoryId).toEqual(billParam.categoryId)
      expect(billResult.description).toEqual(billParam.description)
      expect(billResult.date).toEqual(billParam.date)
      expect(billResult.value).toEqual(billParam.value)
      expect(billResult.isDebt).toEqual(billParam.isDebt)
      expect(billResult.isPaid).toEqual(billParam.isPaid)
      expect(billResult.note).toEqual(billParam.note)
      expect(billResult.periodicity).toEqual(billParam.periodicity)
    })

    test('Should return null from nonexistent parameters', async () => {
      const sut = makeSut()
      const accountId = await mockAccountId()
      const params: LoadBillByIdRepositoryParams = { accountId, id: FakeObjectId.generate() }

      const balanceResult = await sut.loadBillById(params)

      expect(balanceResult).toBeNull()
    })
  })
})
