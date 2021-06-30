import { LoadBalanceByMonthRepositoryParams } from '@/data/protocols'
import { BalanceMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddBalanceRepositoryParams } from '@/tests/data/mocks'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import FakeObjectId from 'bson-objectid'
import faker from 'faker'
import { Collection } from 'mongodb'

let balancesCollection: Collection
let accountCollection: Collection

const makeSut = (): BalanceMongoRepository => {
  return new BalanceMongoRepository()
}

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  return res.ops[0]._id
}

describe('BalanceMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    balancesCollection = await MongoHelper.getCollection('balances')
    await balancesCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('loadBalance()', () => {
    test('Should load a balance from an existing month parameter', async () => {
      const sut = makeSut()
      const accountId = await mockAccountId()
      const newBalance = {
        accountId,
        yearMonth: '2021-05',
        balance: 123.45
      }

      await balancesCollection.insertOne(newBalance)
      const count = await balancesCollection.countDocuments()
      expect(count).toBe(1)

      const params: LoadBalanceByMonthRepositoryParams = { accountId, yearMonth: '2021-05' }

      const balanceResult = await sut.loadBalance(params)

      expect(balanceResult.yearMonth).toBe('2021-05')
      expect(balanceResult.balance).toBe(123.45)
      expect(balanceResult).not.toHaveProperty('accountId')
    })

    test('Should return null from nonexistent month parameter', async () => {
      const sut = makeSut()
      const params: LoadBalanceByMonthRepositoryParams = { accountId: 'any_id', yearMonth: '2021-06' }

      const balanceResult = await sut.loadBalance(params)

      expect(balanceResult).toBeNull()
    })
  })

  describe('add()', () => {
    test('Should add a balance on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddBalanceRepositoryParams())
      const count = await balancesCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('update()', () => {
    test('Should return an updatedBalance on success', async () => {
      const accountId = await mockAccountId()
      const balance = {
        accountId: accountId,
        yearMonth: faker.random.word(),
        balance: faker.random.number()
      }

      const insertBalanceResult = await balancesCollection.insertOne(balance)
      const insertedBalance = insertBalanceResult.ops[0]
      expect(insertedBalance._id).toBeTruthy()
      console.log('insertedBalance._id = ',insertedBalance._id)

      const newBalanceValue = faker.random.number()
      const sut = makeSut()
      const updatedBalance = await sut.update(insertedBalance._id,newBalanceValue)

      expect(updatedBalance).toBeTruthy()
      expect(updatedBalance.id).toEqual(insertedBalance._id)
      expect(updatedBalance.accountId).toEqual(insertedBalance.accountId)
      expect(updatedBalance.yearMonth).toEqual(insertedBalance.yearMonth)
      expect(updatedBalance.balance).toEqual(newBalanceValue)
    })

    test('Should return undefined if could not find the balance to be updated', async () => {
      const sut = makeSut()
      const updatedBalance = await sut.update(FakeObjectId.generate(),faker.random.number())

      expect(updatedBalance).toBeUndefined()
    })
  })
})
