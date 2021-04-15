import { LoadCategories } from '@/domain/usecases'
import { ok } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadCategoriesController implements Controller {
  constructor (
    private readonly loadCategories: LoadCategories
  ) {}

  async handle (request: LoadCategoriesControllerRequest): Promise<HttpResponse> {
    const categories = await this.loadCategories.loadAll(request.accountId)
    return ok(categories)
  }
}

export type LoadCategoriesControllerRequest = {
  accountId: string
}
