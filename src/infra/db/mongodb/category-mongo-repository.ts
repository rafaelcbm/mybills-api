import { AddCategoryRepository, AddCategoryRepositoryParams, LoadCategoriesRepository, LoadCategoriesRepositoryResult, RemoveCategoryRepository } from '@/data/protocols/db'
import { LoadChildCategoriesRepository } from '@/data/protocols/db/category/load-child-categories-repository'
import { RemoveChildCategoriesRepository } from '@/data/protocols/db/category/remove-child-categories-repository'
import { CategoryModel } from '@/domain/models'
import { MongoHelper } from '@/infra/db'
import { ObjectId } from 'bson'

export class CategoryMongoRepository implements AddCategoryRepository, LoadCategoriesRepository, RemoveCategoryRepository , LoadChildCategoriesRepository , RemoveChildCategoriesRepository {
  async add (categoryParam: AddCategoryRepositoryParams): Promise<CategoryModel> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    const category = await categoryCollection.insertOne(categoryParam)
    return MongoHelper.map(category.ops[0])
  }

  async loadAll (accountId: string): Promise<LoadCategoriesRepositoryResult[]> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    const categories = await categoryCollection
      .find({ accountId },{ projection: { accountId: 0 } }).toArray()
    return MongoHelper.mapCollection(categories)
  }

  async remove (accountId: string, categoryId: string): Promise<CategoryModel> {
    const categoriesCollection = await MongoHelper.getCollection('categories')
    const removedCategory = await categoriesCollection.findOneAndDelete({ _id: new ObjectId(categoryId), accountId })

    if (removedCategory.ok && removedCategory.value) {
      return MongoHelper.map(removedCategory.value)
    }
  }

  async loadChild (accountId: string, root: string): Promise<CategoryModel[]> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    const categories = await categoryCollection
      .find({ accountId, root },{ projection: { accountId: 0 } }).toArray()
    return MongoHelper.mapCollection(categories)
  }

  async removeChildCategories (accountId: string, root: string): Promise<number> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    const deleteResult = await categoryCollection.deleteMany({ accountId, ancestors: root })
    return deleteResult.deletedCount
  }
}
