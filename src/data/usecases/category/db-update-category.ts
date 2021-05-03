import { LoadCategoriesRepository, UpdateCategoryRepository } from '@/data/protocols'
import { GenericBusinessError } from '@/domain/errors'
import { CATEGORY_NAME_ALREADY_EXISTS, CATEGORY_NOT_FOUND } from '@/domain/errors/messages/error-messages'
import { CategoryModel } from '@/domain/models'
import { UpdateCategory, UpdateCategoryParam } from '@/domain/usecases/category/update-category'

export class DbUpdateCategory implements UpdateCategory {
  constructor (
    private readonly updateCategoryRepository: UpdateCategoryRepository,
    private readonly loadCategoriesRepository: LoadCategoriesRepository
  ) {}

  async update (updateCategoryParams: UpdateCategoryParam): Promise<CategoryModel> {
    const userCategories = await this.loadCategoriesRepository.loadAll(updateCategoryParams.accountId)
    if (userCategories.length === 0) {
      throw new GenericBusinessError(CATEGORY_NOT_FOUND)
    }

    const categoryById = userCategories.find(c => c.id.toString() === updateCategoryParams.id)
    if (!categoryById) {
      throw new GenericBusinessError(CATEGORY_NOT_FOUND)
    }

    const categoryByName = userCategories.find(c => c.name === updateCategoryParams.name)
    if (categoryByName) {
      throw new GenericBusinessError(CATEGORY_NAME_ALREADY_EXISTS)
    }

    const updatedCategory = await this.updateCategoryRepository.update(updateCategoryParams)
    if (!updatedCategory) {
      throw new GenericBusinessError(CATEGORY_NOT_FOUND)
    }

    return updatedCategory
  }
}
