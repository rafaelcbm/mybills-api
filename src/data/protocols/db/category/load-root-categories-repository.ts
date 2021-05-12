import { CategoryModel } from '@/domain/models'

export type LoadRootCategoriesRepositoryResult = CategoryModel

export interface LoadRootCategoriesRepository {
  loadRoots: (accountId: string) => Promise<LoadRootCategoriesRepositoryResult[]>
}
