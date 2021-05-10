import { CategoryModel } from '@/domain/models'

export type UpdateCategoryRepositoryParams = {
  id: string
  accountId: string
  name: string
  oldName: string
}

export type UpdateCategoryRepositoryResult = CategoryModel

export interface UpdateCategoryRepository {
  update: (updateCategoryRepositoryParams: UpdateCategoryRepositoryParams) => Promise<UpdateCategoryRepositoryResult>
}
