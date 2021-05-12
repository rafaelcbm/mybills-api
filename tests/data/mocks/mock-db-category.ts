import { AddCategoryRepository, AddCategoryRepositoryParams, AddCategoryRepositoryResult, LoadCategoriesRepository, LoadCategoriesRepositoryResult, LoadRootCategoriesRepository, RemoveCategoryRepository, RemoveCategoryRepositoryResult, UpdateCategoryRepository, UpdateCategoryRepositoryParams, UpdateCategoryRepositoryResult, LoadRootCategoriesRepositoryResult } from '@/data/protocols'
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

export const mockLoadCategoriesRepository = (categoryId?: string, categoryName?: string): LoadCategoriesRepository => {
  class LoadCategoryRepositoryStub implements LoadCategoriesRepository {
    async loadAll (accountId: string): Promise<LoadCategoriesRepositoryResult[]> {
      return mockLoadCategoryRepositoryResult(categoryId, categoryName)
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

export const mockLoadChildCategoriesRepository = (accountId?: string, root?: string): LoadChildCategoriesRepository => {
  class LoadChildCategoriesRepositoryStub implements LoadChildCategoriesRepository {
    async loadChild (accountId: string,root: string): Promise<LoadChildCategoriesRepositoryResult[]> {
      return mockLoadChildCategoriesRepositoryResult(accountId, root)
    }
  }
  return new LoadChildCategoriesRepositoryStub()
}

export const mockLoadChildCategoriesRepositoryResult = (accountId?: string, root?: string): LoadChildCategoriesRepositoryResult[] => {
  return [{
    id: faker.random.word(),
    accountId: accountId || faker.random.word(),
    name: faker.random.words(),
    ancestors: [
      faker.random.word(), faker.random.word()
    ],
    root: root || faker.random.word()
  },
  {
    id: faker.random.word(),
    accountId: accountId || faker.random.word(),
    name: faker.random.words(),
    ancestors: [
      faker.random.word(), faker.random.word()
    ],
    root: root || faker.random.word()
  }]
}

export const mockLoadRootCategoriesRepository = (accountId?: string, name?: string): LoadRootCategoriesRepository => {
  class LoadRootCategoriesRepositoryStub implements LoadRootCategoriesRepository {
    async loadRoots (accountId: string): Promise<LoadRootCategoriesRepositoryResult[]> {
      return mockLoadRootCategoriesRepositoryResult(accountId, name)
    }
  }
  return new LoadRootCategoriesRepositoryStub()
}

export const mockLoadRootCategoriesRepositoryResult = (accountId?: string, name?: string): LoadRootCategoriesRepositoryResult[] => {
  return [{
    id: faker.random.word(),
    accountId: accountId || faker.random.word(),
    name: name || faker.random.words(),
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
  accountId?: string, categoryId?: string,name?: string,oldName?: string): UpdateCategoryRepositoryParams => {
  return {
    id: categoryId || faker.random.word(),
    name: name || faker.random.word(),
    accountId: accountId || faker.random.word(),
    oldName: oldName || faker.random.word()
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
