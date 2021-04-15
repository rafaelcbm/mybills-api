import { AddCategoryRepository, LoadCategoriesRepository } from '@/data/protocols'
import { GenericBusinessError } from '@/domain/errors'
import { CATEGORY_NAME_ALREADY_EXISTS } from '@/domain/errors/messages/error-messages'
import { AddCategory, AddCategoryParams, AddCategoryResult } from '@/domain/usecases'

export class DbAddCategory implements AddCategory {
  constructor (
    private readonly addCategoryRepository: AddCategoryRepository,
    private readonly loadCategoriesRepository: LoadCategoriesRepository
  ) {}

  async add (categoryParam: AddCategoryParams): Promise<AddCategoryResult> {
    const categories = await this.loadCategoriesRepository.loadAll(categoryParam.accountId)
    if (categories?.length > 0) {
      const categoryNameExists = categories.find(c => c.name === categoryParam.name)
      if (categoryNameExists) { throw new GenericBusinessError(CATEGORY_NAME_ALREADY_EXISTS) }
    }

    return this.addCategoryRepository.add(categoryParam)
  }
}
