
import { badRequest, ok } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { UpdateCategory } from '@/domain/usecases'

export class UpdateCategoryController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateCategory: UpdateCategory
  ) {}

  async handle (request: UpdateCategoryControllerRequest): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const updatedCategory = await this.updateCategory.update({ id: request.categoryId, accountId: request.accountId, name: request.name })
    return ok(updatedCategory)
  }
}

export type UpdateCategoryControllerRequest = {
  categoryId: string
  accountId: string
  name: string
}
