
import { DbUpdateCategory } from '@/data/usecases'
import { UpdateCategory } from '@/domain/usecases'
import { CategoryMongoRepository } from '@/infra/db'

export const makeDbUpdateCategory = (): UpdateCategory => {
  const categoryMongoRepository = new CategoryMongoRepository()
  return new DbUpdateCategory(categoryMongoRepository, categoryMongoRepository)
}
