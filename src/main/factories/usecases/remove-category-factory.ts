import { DbRemoveCategory } from '@/data/usecases'
import { RemoveCategory } from '@/domain/usecases'
import { CategoryMongoRepository } from '@/infra/db'

export const makeDbRemoveCategory = (): RemoveCategory => {
  const categoryMongoRepository = new CategoryMongoRepository()
  return new DbRemoveCategory(
    categoryMongoRepository,
    categoryMongoRepository,
    categoryMongoRepository,
    categoryMongoRepository
  )
}
