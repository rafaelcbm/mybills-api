import { LoadRootCategoriesRepository } from '@/data/protocols'
import { LoadChildCategoriesRepository } from '@/data/protocols/db/category/load-child-categories-repository'
import { LoadCategoriesTree, LoadCategoriesTreeResult } from '@/domain/usecases'

export class DbLoadCategoriesTree implements LoadCategoriesTree {
  constructor (
    private readonly loadRootCategoriesRepository: LoadRootCategoriesRepository,
    private readonly loadChildCategoriesRepository: LoadChildCategoriesRepository
  ) { }

  async load (accountId: string): Promise<LoadCategoriesTreeResult[]> {
    const roots = await this.loadRootCategoriesRepository.loadRoots(accountId)
    if (!roots || roots.length === 0) {
      return []
    }

    const treeResult = [].concat(roots)
    let allCategories = [].concat(roots)

    for (var i = 0; i < allCategories.length; i++) {
      const actualCategory = allCategories[i]

      const childCategories = await this.loadChildCategoriesRepository.loadChild(accountId, actualCategory.name)
      if (childCategories.length > 0) {
        actualCategory.children = []
        childCategories.forEach(child => actualCategory.children.push(child))

        allCategories = allCategories.concat(childCategories)
      }
    }

    return treeResult
  }
}
