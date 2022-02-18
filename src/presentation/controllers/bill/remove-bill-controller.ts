import { RemoveBill, RemoveBillParams } from '@/domain/usecases'
import { badRequest, noContent } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class RemoveBillController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly removeBill: RemoveBill
  ) { }

  async handle(request: RemoveBillControllerRequest): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }

    await this.removeBill.remove({
      ...request
    })
    return noContent()
  }
}

export type RemoveBillControllerRequest = RemoveBillParams
