import { CategoryModel } from '@/domain/models'
import { AddCategory, AddCategoryParams, AddCategoryResult, LoadCategories, LoadCategoriesResult, LoadCategoriesTree, LoadCategoriesTreeResult, RemoveCategory, UpdateCategory } from '@/domain/usecases'
import { mockAddCategoryResult, mockCategoryModel, mockLoadCategoriesResult, mockLoadCategoriesTreeResult } from '@/tests/domain/mocks'

export const mockAddCategory = (): AddCategory => {
  class AddCategoryStub implements AddCategory {
    async add (data: AddCategoryParams): Promise<AddCategoryResult> {
      return mockAddCategoryResult()
    }
  }
  return new AddCategoryStub()
}

export const mockLoadCategories = (): LoadCategories => {
  class LoadCategoriesStub implements LoadCategories {
    async loadAll (accountId: string): Promise<LoadCategoriesResult[]> {
      return [
        mockLoadCategoriesResult(),
        mockLoadCategoriesResult()
      ]
    }
  }
  return new LoadCategoriesStub()
}

export const mockRemoveCategory = (): RemoveCategory => {
  class RemoveCategoryStub implements RemoveCategory {
    async remove (accountId: string, categoryId: string): Promise<void> { }
  }
  return new RemoveCategoryStub()
}

export const mockUpdateCategory = (): UpdateCategory => {
  class UpdateCategoryStub implements UpdateCategory {
    async update (updateCategoryParams: CategoryModel): Promise<CategoryModel> {
      return mockCategoryModel()
    }
  }
  return new UpdateCategoryStub()
}

export const mockLoadCategoriesTree = (): LoadCategoriesTree => {
  class LoadCategoriesTreeStub implements LoadCategoriesTree {
    async load (accountId: string): Promise<LoadCategoriesTreeResult[]> {
      return mockLoadCategoriesTreeResult()
    }
  }
  return new LoadCategoriesTreeStub()
}
