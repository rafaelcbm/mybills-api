import { AddCategoryRepository, AddCategoryRepositoryParams, LoadCategoriesRepository, LoadCategoriesRepositoryResult } from '@/data/protocols'
import { CategoryModel } from '@/domain/models'
import { AddCategoryParams } from '@/domain/usecases'
import { mockCategoryModel } from '@/tests/domain/mocks'
import faker from 'faker'

export const mockAddCategoryRepository = (): AddCategoryRepository => {
  class AddCategoryRepositoryStub implements AddCategoryRepository {
    async add (addCategoryParams: AddCategoryParams): Promise<CategoryModel> {
      return mockCategoryModel()
    }
  }
  return new AddCategoryRepositoryStub()
}

export const mockAddCategoryRepositoryParams = (accountId?: string): AddCategoryRepositoryParams => {
  return {
    name: faker.random.words(),
    accountId: accountId || faker.random.word(),
    ancestors: [
      faker.random.word(), faker.random.word()
    ],
    root: faker.random.word()
  }
}

export const mockLoadCategoriesRepository = (): LoadCategoriesRepository => {
  class LoadCategoryRepositoryStub implements LoadCategoriesRepository {
    async loadAll (accountId: string): Promise<LoadCategoriesRepositoryResult[]> {
      return mockLoadCategoryRepositoryResult()
    }
  }
  return new LoadCategoryRepositoryStub()
}

export const mockLoadCategoryRepositoryResult = (): LoadCategoriesRepositoryResult[] => {
  return [{
    id: faker.random.word(),
    name: faker.random.words(),
    ancestors: [
      faker.random.word(), faker.random.word()
    ],
    root: faker.random.word()
  },
  {
    id: faker.random.word(),
    name: faker.random.words(),
    ancestors: [
      faker.random.word(), faker.random.word()
    ],
    root: faker.random.word()
  }]
}
