import { CategoryModel } from '@/domain/models'

export type LoadCategoriesResult = Omit<CategoryModel, 'accountId'>

export interface LoadCategories {
  loadAll: (accountId: string) => Promise<LoadCategoriesResult[]>
}
