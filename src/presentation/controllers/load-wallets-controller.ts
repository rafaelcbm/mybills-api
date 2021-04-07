import { LoadWallets } from '@/domain/usecases/load-wallets'
import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadWalletsController implements Controller {
  constructor (
    private readonly loadWallets: LoadWallets
  ) {}

  async handle (request: LoadWalletsControllerRequest): Promise<HttpResponse> {
    try {
      const wallets = await this.loadWallets.loadAll(request.accountId)
      return ok(wallets)
    } catch (error) {
      return serverError(error)
    }
  }
}

export type LoadWalletsControllerRequest = {
  accountId: string
}
