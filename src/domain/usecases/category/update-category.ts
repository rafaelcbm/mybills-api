import { CategoryModel } from '@/domain/models'

export interface UpdateCategory {
  update: (updateCategoryParams: UpdateCategoryParam) => Promise<CategoryModel>
}

export type UpdateCategoryParam = {
  id: string
  accountId: string
  name: string
}
