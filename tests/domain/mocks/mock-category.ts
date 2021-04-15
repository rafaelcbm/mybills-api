import { AddCategoryParams, AddCategoryResult, LoadCategoriesResult } from '@/domain/usecases'
import faker from 'faker'

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
