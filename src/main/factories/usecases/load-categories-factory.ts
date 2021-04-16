import { DbLoadCategories } from '@/data/usecases'
import { LoadCategories } from '@/domain/usecases'
import { CategoryMongoRepository } from '@/infra/db'

export const makeDbLoadCategories = (): LoadCategories => {
  const walletMongoRepository = new CategoryMongoRepository()
  return new DbLoadCategories(walletMongoRepository)
}
