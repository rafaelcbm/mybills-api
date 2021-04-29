import { RemoveCategory } from '@/domain/usecases'
import { badRequest, noContent } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class RemoveCategoryController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly removeCategory: RemoveCategory
  ) {}

  async handle (request: RemoveCategoryControllerRequest): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    await this.removeCategory.remove(request.accountId, request.categoryId)
    return noContent()
  }
}

export type RemoveCategoryControllerRequest = {
  categoryId: string
  accountId: string
}
