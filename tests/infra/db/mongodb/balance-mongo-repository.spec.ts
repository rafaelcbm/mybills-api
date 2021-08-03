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

  describe('loadLastBalance()', () => {
    test('Should load the last balance from an existing month parameter', async () => {
      const sut = makeSut()
      const accountId = await mockAccountId()
      const balance1 = {
        accountId,
        yearMonth: '2021-05',
        balance: 123.45
      }
      const balance2 = {
        accountId,
        yearMonth: '2021-06',
        balance: 321.22
      }
      const balance3 = {
        accountId,
        yearMonth: '2021-07',
        balance: 456.21
      }
      await balancesCollection.insertOne(balance1)
      await balancesCollection.insertOne(balance2)
      await balancesCollection.insertOne(balance3)
      const count = await balancesCollection.countDocuments()
      expect(count).toBe(3)

      const balanceResult = await sut.loadLastBalance(accountId, '2021-07')

      expect(balanceResult.id).toBeTruthy()
      expect(balanceResult.yearMonth).toBe('2021-06')
      expect(balanceResult.balance).toBe(321.22)
      expect(balanceResult).not.toHaveProperty('accountId')
    })

    test('Should return null when there is no month before passed month parameter', async () => {
      const sut = makeSut()
      const accountId = await mockAccountId()
      const balance1 = {
        accountId,
        yearMonth: '2021-05',
        balance: 123.45
      }
      const balance2 = {
        accountId,
        yearMonth: '2021-06',
        balance: 321.22
      }
      await balancesCollection.insertOne(balance1)
      await balancesCollection.insertOne(balance2)
      const count = await balancesCollection.countDocuments()
      expect(count).toBe(2)

      const balanceResult = await sut.loadLastBalance(accountId, '2021-05')

      expect(balanceResult).toBeNull()
    })
  })

  describe('loadFutureBalances()', () => {
    test('Should load future balances from a month parameter', async () => {
      const sut = makeSut()
      const accountId = await mockAccountId()
      const balance1 = {
        accountId,
        yearMonth: '2021-05',
        balance: 123.45
      }
      const balance2 = {
        accountId,
        yearMonth: '2021-06',
        balance: 321.22
      }
      const balance3 = {
        accountId,
        yearMonth: '2021-07',
        balance: 456.21
      }
      await balancesCollection.insertOne(balance1)
      await balancesCollection.insertOne(balance2)
      await balancesCollection.insertOne(balance3)
      const count = await balancesCollection.countDocuments()
      expect(count).toBe(3)

      const balanceResult = await sut.loadFutureBalances(accountId, '2021-05')

      expect(balanceResult.length).toBe(2)

      expect(balanceResult[0].id).toBeTruthy()
      expect(balanceResult[0].yearMonth).toBe('2021-06')
      expect(balanceResult[0].balance).toBe(321.22)
      expect(balanceResult[0]).not.toHaveProperty('accountId')

      expect(balanceResult[1].id).toBeTruthy()
      expect(balanceResult[1].yearMonth).toBe('2021-07')
      expect(balanceResult[1].balance).toBe(456.21)
      expect(balanceResult[1]).not.toHaveProperty('accountId')
    })

    test('Should return empty array when there is no months after the month parameter', async () => {
      const sut = makeSut()
      const accountId = await mockAccountId()
      const balance1 = {
        accountId,
        yearMonth: '2021-05',
        balance: 123.45
      }
      const balance2 = {
        accountId,
        yearMonth: '2021-06',
        balance: 321.22
      }
      await balancesCollection.insertOne(balance1)
      await balancesCollection.insertOne(balance2)
      const count = await balancesCollection.countDocuments()
      expect(count).toBe(2)

      const balanceResult = await sut.loadFutureBalances(accountId, '2021-06')

      expect(balanceResult).toEqual([])
    })
  })
})
