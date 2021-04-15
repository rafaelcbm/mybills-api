import { AddCategory, AddCategoryParams, AddCategoryResult, LoadCategories, LoadCategoriesResult } from '@/domain/usecases'
import { mockAddCategoryResult, mockLoadCategoriesResult } from '@/tests/domain/mocks'

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
