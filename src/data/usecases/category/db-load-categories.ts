import { LoadCategories, LoadCategoriesResult } from '@/domain/usecases'
import { LoadCategoriesRepository } from '@/data/protocols'

export class DbLoadCategories implements LoadCategories {
  constructor (
    private readonly loadCategoriesRepository: LoadCategoriesRepository
  ) { }

  async loadAll (accountId: string): Promise<LoadCategoriesResult[]> {
    const categoriesDbResult = await this.loadCategoriesRepository.loadAll(accountId)
    return categoriesDbResult.map(categoryModel => {
      const { accountId, ...category } = categoryModel
      return category
    })
  }
}
