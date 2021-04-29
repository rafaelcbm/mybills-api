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

  describe('remove()', () => {
    test('Should remove a category on success', async () => {
      const accountId = await mockAccountId()
      const category1 = mockAddCategoryRepositoryParams(accountId)
      const category2 = mockAddCategoryRepositoryParams(accountId)
      const categorysParams = [category1, category2]

      const insertedCategoriesResult = await categoriesCollection.insertMany(categorysParams)
      expect(insertedCategoriesResult.ops.length).toBe(2)
      const dbCategory1 = insertedCategoriesResult.ops[0]

      const sut = makeSut()
      const removedCategory = await sut.remove(accountId, dbCategory1._id)

      expect(removedCategory).toBeTruthy()
      expect(removedCategory.accountId).toEqual(dbCategory1.accountId)
      expect(removedCategory.id).toEqual(dbCategory1._id)
      expect(removedCategory.root).toEqual(dbCategory1.root)
      expect(removedCategory.name).toEqual(dbCategory1.name)
      expect(removedCategory.ancestors).toEqual(dbCategory1.ancestors)
    })
  })

  describe('loadChild()', () => {
    test('Should load category children on success', async () => {
      const accountId = await mockAccountId()
      const category1 = mockAddCategoryRepositoryParams(accountId)
      const category2 = mockAddCategoryRepositoryParams(accountId)
      const category3 = mockAddCategoryRepositoryParams(accountId)

      const rootCategoryResult = await categoriesCollection.insertOne(category1)
      const rootCategory = rootCategoryResult.ops[0]

      category2.root = rootCategory.name
      const childCategory2Result = await categoriesCollection.insertOne(category2)
      const childCategory2 = childCategory2Result.ops[0]
      expect(childCategory2).toBeTruthy()

      category3.root = rootCategory.name
      const childCategory3Result = await categoriesCollection.insertOne(category3)
      const childCategory3 = childCategory3Result.ops[0]
      expect(childCategory3).toBeTruthy()

      const sut = makeSut()
      const childCategories = await sut.loadChild(accountId, rootCategory.name)

      expect(childCategories.length).toBe(2)
      expect(childCategories[0]).not.toHaveProperty('accountId')
      expect(childCategories[0].name).toBeTruthy()
      expect(childCategories[0].root).toBe(rootCategory.name)
      expect(childCategories[0].ancestors.length).toBe(2)
      expect(childCategories[1]).not.toHaveProperty('accountId')
      expect(childCategories[1].name).toBeTruthy()
      expect(childCategories[1].root).toBe(rootCategory.name)
      expect(childCategories[1].ancestors.length).toBe(2)
    })

    test('Should load empty list', async () => {
      const accountId = await mockAccountId()
      const sut = makeSut()
      const categories = await sut.loadAll(accountId)

      expect(categories.length).toBe(0)
    })
  })

  describe('removeChildCategories()', () => {
    test('Should remove category children, in all levels, on success', async () => {
      const accountId = await mockAccountId()
      const category1 = mockAddCategoryRepositoryParams(accountId)
      const category2 = mockAddCategoryRepositoryParams(accountId)
      const category3 = mockAddCategoryRepositoryParams(accountId)

      const rootCategoryResult = await categoriesCollection.insertOne(category1)
      const rootCategory = rootCategoryResult.ops[0]

      category2.root = rootCategory.name
      category2.ancestors.push(rootCategory.name)
      const childCategory2Result = await categoriesCollection.insertOne(category2)
      const childCategory2 = childCategory2Result.ops[0]
      expect(childCategory2).toBeTruthy()

      category3.root = childCategory2.name
      category3.ancestors.push(rootCategory.name , childCategory2.name)
      const childCategory3Result = await categoriesCollection.insertOne(category3)
      const childCategory3 = childCategory3Result.ops[0]
      expect(childCategory3).toBeTruthy()

      const sut = makeSut()
      const numberCategoriesRemoved = await sut.removeChildCategories(accountId, rootCategory.name)

      expect(numberCategoriesRemoved).toBe(2)
    })

    test('Should load empty list', async () => {
      const accountId = await mockAccountId()
      const sut = makeSut()
      const categories = await sut.loadAll(accountId)

      expect(categories.length).toBe(0)
    })
  })
})
