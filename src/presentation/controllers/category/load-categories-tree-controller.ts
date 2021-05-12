import { LoadCategoriesTree } from '@/domain/usecases'
import { ok } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadCategoriesTreeController implements Controller {
  constructor (
    private readonly loadCategoriesTree: LoadCategoriesTree
  ) {}

  async handle (request: LoadCategoriesControllerRequest): Promise<HttpResponse> {
    const categoriesTree = await this.loadCategoriesTree.load(request.accountId)
    return ok(categoriesTree)
  }
}

export type LoadCategoriesControllerRequest = {
  accountId: string
}
