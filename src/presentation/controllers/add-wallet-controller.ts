import { AddWallet } from '@/domain/usecases'
import { badRequest, noContent } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddWalletController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addWallet: AddWallet
  ) {}

  async handle (request: AddWalletControllerRequest): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    await this.addWallet.add({
      ...request
    })
    return noContent()
  }
}

export type AddWalletControllerRequest = {
  accountId: string
  name: string
}
