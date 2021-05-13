import { AddCategoryRepository, AddCategoryRepositoryParams, LoadCategoriesRepository, LoadCategoriesRepositoryResult, LoadRootCategoriesRepository, LoadRootCategoriesRepositoryResult, RemoveCategoryRepository, UpdateCategoryRepository, UpdateCategoryRepositoryParams, UpdateCategoryRepositoryResult } from '@/data/protocols/db'
import { LoadChildCategoriesRepository } from '@/data/protocols/db/category/load-child-categories-repository'
import { RemoveChildCategoriesRepository } from '@/data/protocols/db/category/remove-child-categories-repository'
import { CategoryModel } from '@/domain/models'
import { MongoHelper } from '@/infra/db'
import { ObjectId } from 'bson'

export class CategoryMongoRepository implements AddCategoryRepository, LoadCategoriesRepository, RemoveCategoryRepository,
                        LoadChildCategoriesRepository , RemoveChildCategoriesRepository, UpdateCategoryRepository, LoadRootCategoriesRepository {
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

  async loadRoots (accountId: string): Promise<LoadRootCategoriesRepositoryResult[]> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    const categories = await categoryCollection
      .find({ accountId, root: null },{ projection: { accountId: 0 } }).toArray()
    return MongoHelper.mapCollection(categories)
  }

  async removeChildCategories (accountId: string, root: string): Promise<number> {
    const categoryCollection = await MongoHelper.getCollection('categories')
    const deleteResult = await categoryCollection.deleteMany({ accountId, ancestors: root })
    return deleteResult.deletedCount
  }

  async update (updateCategoryRepositoryParams: UpdateCategoryRepositoryParams): Promise<UpdateCategoryRepositoryResult> {
    const categoryCollection = await MongoHelper.getCollection('categories')

    // Updates the child categories ancestors reference
    await categoryCollection.updateMany(
      {
        accountId: new ObjectId(updateCategoryRepositoryParams.accountId),
        ancestors: updateCategoryRepositoryParams.oldName
      }, {
        $push: { ancestors: updateCategoryRepositoryParams.name }
      })

    await categoryCollection.updateMany(
      {
        accountId: new ObjectId(updateCategoryRepositoryParams.accountId),
        ancestors: updateCategoryRepositoryParams.oldName
      }, {
        $pull: { ancestors: updateCategoryRepositoryParams.oldName }
      })

    // Updates the child categories root reference
    await categoryCollection.updateMany(
      {
        accountId: new ObjectId(updateCategoryRepositoryParams.accountId),
        root: updateCategoryRepositoryParams.oldName
      }, {
        $set: { root: updateCategoryRepositoryParams.name }
      })

    // Updates the category name
    const updatedCategory = await categoryCollection.findOneAndUpdate(
      {
        _id: new ObjectId(updateCategoryRepositoryParams.id),
        accountId: new ObjectId(updateCategoryRepositoryParams.accountId)
      }, {
        $set: {
          name: updateCategoryRepositoryParams.name
        }
      }, {
        returnOriginal: false
      })

    if (updatedCategory.ok && updatedCategory.value) {
      return MongoHelper.map(updatedCategory.value)
    }
  }
}
