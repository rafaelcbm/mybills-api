import { LoadWallets } from '@/domain/usecases/load-wallets'
import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadWalletsController implements Controller {
  constructor (
    private readonly loadWallets: LoadWallets
  ) {}

  async handle (request: LoadWalletsControllerRequest): Promise<HttpResponse> {
    const wallets = await this.loadWallets.loadAll(request.accountId)
    return ok(wallets)
  }
}

export type LoadWalletsControllerRequest = {
  accountId: string
}
