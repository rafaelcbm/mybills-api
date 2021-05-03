import { AddCategoryRepository, AddCategoryRepositoryParams, AddCategoryRepositoryResult, LoadCategoriesRepository, LoadCategoriesRepositoryResult, RemoveCategoryRepository, RemoveCategoryRepositoryResult, UpdateCategoryRepository, UpdateCategoryRepositoryParams, UpdateCategoryRepositoryResult } from '@/data/protocols'
import { AddCategoryParams } from '@/domain/usecases'
import { LoadChildCategoriesRepository, LoadChildCategoriesRepositoryResult } from '../protocols/db/category/load-child-categories-repository'
import { RemoveChildCategoriesRepository } from '../protocols/db/category/remove-child-categories-repository'
import faker from 'faker'

export const mockAddCategoryRepository = (): AddCategoryRepository => {
  class AddCategoryRepositoryStub implements AddCategoryRepository {
    async add (addCategoryParams: AddCategoryParams): Promise<AddCategoryRepositoryResult> {
      return mockAddCategoryRepositoryResult()
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

export const mockAddCategoryRepositoryResult = (accountId?: string): AddCategoryRepositoryResult => {
  return {
    id: faker.random.word(),
    name: faker.random.words(),
    ancestors: [
      faker.random.word(), faker.random.word()
    ],
    root: faker.random.word()
  }
}

export const mockLoadCategoriesRepository = (categoryId?: string): LoadCategoriesRepository => {
  class LoadCategoryRepositoryStub implements LoadCategoriesRepository {
    async loadAll (accountId: string): Promise<LoadCategoriesRepositoryResult[]> {
      return mockLoadCategoryRepositoryResult(categoryId)
    }
  }
  return new LoadCategoryRepositoryStub()
}

export const mockLoadCategoryRepositoryResult = (categoryId?: string,categoryName?: string): LoadCategoriesRepositoryResult[] => {
  return [{
    id: categoryId || faker.random.word(),
    name: categoryName || faker.random.words(),
    ancestors: [
      faker.random.word(), faker.random.word()
    ],
    root: faker.random.word()
  },
  {
    id: categoryId || faker.random.word(),
    name: faker.random.words(),
    ancestors: [
      faker.random.word(), faker.random.word()
    ],
    root: faker.random.word()
  }]
}

export const mockRemoveCategoryRepository = (): RemoveCategoryRepository => {
  class RemoveCategoryRepositoryStub implements RemoveCategoryRepository {
    async remove (categoryId: string, accountId: string): Promise<RemoveCategoryRepositoryResult> {
      return Promise.resolve(mockRemoveCategoryRepositoryResult())
    }
  }
  return new RemoveCategoryRepositoryStub()
}

export const mockRemoveChildCategoriesRepository = (): RemoveChildCategoriesRepository => {
  class RemoveChildCategoriesRepositoryStub implements RemoveChildCategoriesRepository {
    async removeChildCategories (root: string, accountId: string): Promise<number> {
      return Promise.resolve(2)
    }
  }
  return new RemoveChildCategoriesRepositoryStub()
}

export const mockLoadChildCategoriesRepository = (): LoadChildCategoriesRepository => {
  class LoadChildCategoriesRepositoryStub implements LoadChildCategoriesRepository {
    async loadChild (root: string, accountId: string): Promise<LoadChildCategoriesRepositoryResult[]> {
      return mockLoadChildCategoriesRepositoryResult()
    }
  }
  return new LoadChildCategoriesRepositoryStub()
}

export const mockLoadChildCategoriesRepositoryResult = (): LoadChildCategoriesRepositoryResult[] => {
  return [{
    id: faker.random.word(),
    accountId: faker.random.word(),
    name: faker.random.words(),
    ancestors: [
      faker.random.word(), faker.random.word()
    ],
    root: faker.random.word()
  },
  {
    id: faker.random.word(),
    accountId: faker.random.word(),
    name: faker.random.words(),
    ancestors: [
      faker.random.word(), faker.random.word()
    ],
    root: faker.random.word()
  }]
}

export const mockRemoveCategoryRepositoryResult = (): RemoveCategoryRepositoryResult => {
  return {
    id: faker.random.word(),
    accountId: faker.random.word(),
    name: faker.random.words(),
    ancestors: [
      faker.random.word(), faker.random.word()
    ],
    root: faker.random.word()
  }
}

export const mockUpdateCategoryRepository = (): UpdateCategoryRepository => {
  class UpdateCategoryRepositoryStub implements UpdateCategoryRepository {
    async update (updateCategoryRepositoryParams: UpdateCategoryRepositoryParams): Promise<UpdateCategoryRepositoryResult> {
      return Promise.resolve(mockUpdateCategoryRepositoryResult())
    }
  }
  return new UpdateCategoryRepositoryStub()
}

export const mockUpdateCategoryRepositoryParams = (
  accountId?: string,
  categoryId?: string): UpdateCategoryRepositoryParams => {
  return {
    id: categoryId || faker.random.word(),
    name: faker.random.words(),
    accountId: accountId || faker.random.word()
  }
}

export const mockUpdateCategoryRepositoryResult = (): UpdateCategoryRepositoryResult => {
  return {
    id: faker.random.word(),
    name: faker.random.words(),
    accountId: faker.random.word(),
    root: faker.random.word(),
    ancestors: [
      faker.random.word(), faker.random.word()
    ]
  }
}
