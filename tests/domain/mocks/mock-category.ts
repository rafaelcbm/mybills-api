import { CategoryModel } from '@/domain/models'
import { AddCategoryParams } from '@/domain/usecases'
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
