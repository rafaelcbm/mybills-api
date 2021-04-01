import { AddWallet } from '@/domain/usecases'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddWalletController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addWallet: AddWallet
  ) {}

  async handle (request: AddWalletControllerResquest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      await this.addWallet.add({
        ...request
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export type AddWalletControllerResquest = {
  accountId: string
  name: string
}
