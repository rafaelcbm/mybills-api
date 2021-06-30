import { LoadBalanceByMonthRepositoryParams } from '@/data/protocols'
import { BalanceMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddBalanceRepositoryParams } from '@/tests/data/mocks'
import { mockAddAccountParams } from '@/tests/domain/mocks'
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
})
