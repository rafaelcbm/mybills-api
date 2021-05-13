import { DbLoadCategoriesTree } from '@/data/usecases'
import { LoadCategoriesTree } from '@/domain/usecases'
import { CategoryMongoRepository } from '@/infra/db'

export const makeDbLoadCategoriesTree = (): LoadCategoriesTree => {
  const categoryMongoRepository = new CategoryMongoRepository()
  return new DbLoadCategoriesTree(categoryMongoRepository, categoryMongoRepository)
}
