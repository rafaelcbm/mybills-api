import { RemoveWallet } from '@/domain/usecases'
import { badRequest, noContent } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class RemoveWalletController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly removeWallet: RemoveWallet
  ) {}

  async handle (request: RemoveWalletControllerRequest): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    await this.removeWallet.remove(request.walletId, request.accountId)
    return noContent()
  }
}

export type RemoveWalletControllerRequest = {
  walletId: string
  accountId: string
}
