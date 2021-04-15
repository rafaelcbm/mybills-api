import { CategoryMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddCategoryRepositoryParams } from '@/tests/data/mocks'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { Collection } from 'mongodb'

let categoriesCollection: Collection
let accountCollection: Collection

const makeSut = (): CategoryMongoRepository => {
  return new CategoryMongoRepository()
}

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  return res.ops[0]._id
}

describe('CategoryMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    categoriesCollection = await MongoHelper.getCollection('categories')
    await categoriesCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a categories on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddCategoryRepositoryParams())
      const count = await categoriesCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('loadAll()', () => {
    test('Should load all categories on success', async () => {
      const accountId = await mockAccountId()
      const categories1 = mockAddCategoryRepositoryParams(accountId)
      const categories2 = mockAddCategoryRepositoryParams(accountId)
      const categoriesParams = [categories1, categories2]
      await categoriesCollection.insertMany(categoriesParams)

      const sut = makeSut()
      const categories = await sut.loadAll(accountId)

      expect(categories.length).toBe(2)
      expect(categories[0]).not.toHaveProperty('accountId')
      expect(categories[0].name).toBeTruthy()
      expect(categories[0].root).toBeTruthy()
      expect(categories[0].ancestors.length).toBe(2)
      expect(categories[1]).not.toHaveProperty('accountId')
      expect(categories[1].name).toBeTruthy()
      expect(categories[1].root).toBeTruthy()
      expect(categories[1].ancestors.length).toBe(2)
    })

    test('Should load empty list', async () => {
      const accountId = await mockAccountId()
      const sut = makeSut()
      const categories = await sut.loadAll(accountId)

      expect(categories.length).toBe(0)
    })
  })
})
