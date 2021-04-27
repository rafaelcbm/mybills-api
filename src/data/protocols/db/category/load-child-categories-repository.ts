import { CategoryModel } from '@/domain/models'

export type LoadChildCategoriesRepositoryResult = CategoryModel

export interface LoadChildCategoriesRepository {
  loadChild: (accountId: string, root: string) => Promise<LoadChildCategoriesRepositoryResult[]>
}
