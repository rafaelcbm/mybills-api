import { AddCategoryRepository, AddCategoryRepositoryParams, LoadCategoriesRepository, LoadCategoriesRepositoryResult } from '@/data/protocols/db'
import { CategoryModel } from '@/domain/models'
import { MongoHelper } from '@/infra/db'

export class CategoryMongoRepository implements AddCategoryRepository, LoadCategoriesRepository {
  async add (categoryParam: AddCategoryRepositoryParams): Promise<CategoryModel> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    const category = await categoryCollection.insertOne(categoryParam)
    return MongoHelper.map(category.ops[0])
  }

  async loadAll (accountId: string): Promise<LoadCategoriesRepositoryResult[]> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    const categories = await categoryCollection.find({ accountId }).toArray()
    return MongoHelper.mapCollection(categories)
  }
}
