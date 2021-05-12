import { AddCategoryParams, AddCategoryResult, LoadCategoriesResult, LoadCategoriesTreeResult } from '@/domain/usecases'
import faker from 'faker'
import { CategoryModel } from '../models'

export const mockAddCategoryParams = (): AddCategoryParams => {
  return {
    name: faker.random.words(),
    accountId: faker.random.word(),
    ancestors: [
      faker.random.word(), faker.random.word()
    ],
    root: faker.random.word()
  }
}

export const mockAddCategoryResult = (): AddCategoryResult => {
  return {
    id: faker.random.word(),
    name: faker.random.words(),
    ancestors: [
      faker.random.word(), faker.random.word()
    ],
    root: faker.random.word()
  }
}

export const mockLoadCategoriesResult = (): LoadCategoriesResult => {
  return {
    id: faker.random.word(),
    name: faker.random.words(),
    ancestors: [
      faker.random.word(), faker.random.word()
    ],
    root: faker.random.word()
  }
}

export const mockCategoryModel = (): CategoryModel => {
  return {
    id: faker.random.word(),
    name: faker.random.words(),
    accountId: faker.random.word(),
    ancestors: [
      faker.random.word(), faker.random.word()
    ],
    root: faker.random.word()
  }
}

export const mockLoadCategoriesTreeResult = (): LoadCategoriesTreeResult[] => {
  const rootName = faker.random.word()
  return [{
    id: faker.random.word(),
    name: rootName,
    ancestors: [],
    root: null,
    children: [{
      id: faker.random.word(),
      name: faker.random.words(),
      ancestors: [
        rootName
      ],
      root: rootName
    }, {
      id: faker.random.word(),
      name: faker.random.words(),
      ancestors: [
        rootName
      ],
      root: rootName
    }
    ]
  }]
}
