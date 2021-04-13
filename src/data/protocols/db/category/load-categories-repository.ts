import { CategoryModel } from '@/domain/models'

export type LoadCategoriesRepositoryResult = CategoryModel

export interface LoadCategoriesRepository {
  loadAll: (accountId: string) => Promise<LoadCategoriesRepositoryResult[]>
}
