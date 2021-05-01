import { LoadCategoriesRepository, RemoveCategoryRepository } from '@/data/protocols'
import { LoadChildCategoriesRepository } from '@/data/protocols/db/category/load-child-categories-repository'
import { RemoveChildCategoriesRepository } from '@/data/protocols/db/category/remove-child-categories-repository'
import { GenericBusinessError } from '@/domain/errors'
import { CATEGORY_NOT_FOUND } from '@/domain/errors/messages/error-messages'
import { RemoveCategory } from '@/domain/usecases'

export class DbRemoveCategory implements RemoveCategory {
  constructor (
    private readonly removeCategoryRepository: RemoveCategoryRepository,
    private readonly removeChildCategoriesRepository: RemoveChildCategoriesRepository,
    private readonly loadCategoriesRepository: LoadCategoriesRepository,
    private readonly loadChildCategoriesRepository: LoadChildCategoriesRepository
  ) {}

  async remove (accountId: string, categoryId: string): Promise<void> {
    const userCategories = await this.loadCategoriesRepository.loadAll(accountId)

    if (userCategories.length === 0) {
      throw new GenericBusinessError(CATEGORY_NOT_FOUND)
    }

    const categoryToBeRemoved = userCategories.find(c => c.id.toString() === categoryId)

    const childCategories = await this.loadChildCategoriesRepository.loadChild(accountId, categoryToBeRemoved.name)
    if (childCategories.length > 0) {
      await this.removeChildCategoriesRepository.removeChildCategories(accountId, categoryToBeRemoved.name)
    }

    if (!await this.removeCategoryRepository.remove(accountId, categoryId)) {
      throw new GenericBusinessError(CATEGORY_NOT_FOUND)
    }
  }
}
