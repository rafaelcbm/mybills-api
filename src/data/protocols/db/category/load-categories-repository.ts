import { CategoryModel } from '@/domain/models'

export type LoadCategoriesRepositoryResult = Omit<CategoryModel, 'accountId'>

export interface LoadCategoriesRepository {
  loadAll: (accountId: string) => Promise<LoadCategoriesRepositoryResult[]>
}
