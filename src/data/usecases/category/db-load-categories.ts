import { LoadCategories, LoadCategoriesResult } from '@/domain/usecases'
import { LoadCategoriesRepository } from '@/data/protocols'

export class DbLoadCategories implements LoadCategories {
  constructor (
    private readonly loadCategoriesRepository: LoadCategoriesRepository
  ) { }

  async loadAll (accountId: string): Promise<LoadCategoriesResult[]> {
    return this.loadCategoriesRepository.loadAll(accountId)
  }
}
