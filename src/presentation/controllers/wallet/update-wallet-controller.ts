import { UpdateWallet } from '@/domain/usecases'
import { badRequest, ok } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class UpdateWalletController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateWallet: UpdateWallet
  ) {}

  async handle (request: UpdateWalletControllerRequest): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const updatedWallet = await this.updateWallet.update({ id: request.walletId, accountId: request.accountId, name: request.name })
    return ok(updatedWallet)
  }
}

export type UpdateWalletControllerRequest = {
  walletId: string
  accountId: string
  name: string
}
