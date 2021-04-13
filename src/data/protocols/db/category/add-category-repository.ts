import { CategoryModel } from '@/domain/models'
import { AddCategoryParams } from '@/domain/usecases'

export type AddCategoryRepositoryParams = AddCategoryParams

export interface AddCategoryRepository {
  add: (categoryParam: AddCategoryRepositoryParams) => Promise<CategoryModel>
}
