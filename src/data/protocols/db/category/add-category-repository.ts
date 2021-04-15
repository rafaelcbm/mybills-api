import { CategoryModel } from '@/domain/models'
import { AddCategoryParams } from '@/domain/usecases'

export type AddCategoryRepositoryParams = AddCategoryParams
export type AddCategoryRepositoryResult = Omit<CategoryModel, 'accountId'>

export interface AddCategoryRepository {
  add: (categoryParam: AddCategoryRepositoryParams) => Promise<AddCategoryRepositoryResult>
}
