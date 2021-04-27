import { CategoryModel } from '@/domain/models'

export type RemoveCategoryRepositoryResult = CategoryModel

export interface RemoveCategoryRepository {
  remove: (accountId: string, categoryId: string) => Promise<RemoveCategoryRepositoryResult>
}
