import { LoadWallets } from '@/domain/usecases/wallet/load-wallets'
import { ok } from '@/presentation/helpers'
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
