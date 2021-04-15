import { CategoryModel } from '@/domain/models'

export type AddCategoryParams = Omit<CategoryModel, 'id'>
export type AddCategoryResult = Omit<CategoryModel, 'accountId'>

export interface AddCategory {
  add: (category: AddCategoryParams) => Promise<AddCategoryResult>
}
