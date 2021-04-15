import { AddCategory, AddCategoryParams } from '@/domain/usecases'
import { badRequest, ok } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddCategoryController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addCategory: AddCategory
  ) {}

  async handle (request: AddCategoryControllerRequest): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const newCategory = await this.addCategory.add({
      ...request
    })
    return ok(newCategory)
  }
}

export type AddCategoryControllerRequest = AddCategoryParams
