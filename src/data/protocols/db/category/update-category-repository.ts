import { CategoryModel } from '@/domain/models'
import { UpdateCategoryParam } from '@/domain/usecases/category/update-category'

export type UpdateCategoryRepositoryParams = UpdateCategoryParam
export type UpdateCategoryRepositoryResult = CategoryModel

export interface UpdateCategoryRepository {
  update: (updateCategoryRepositoryParams: UpdateCategoryRepositoryParams) => Promise<UpdateCategoryRepositoryResult>
}
