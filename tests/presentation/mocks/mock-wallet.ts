import { AddWallet, AddWalletParams } from '@/domain/usecases'
import { LoadWallets, LoadWalletsResult } from '@/domain/usecases/load-wallets'
import { mockLoadWalletsResult } from '@/tests/domain/mocks'

export const mockAddWallet = (): AddWallet => {
  class AddWalletStub implements AddWallet {
    async add (data: AddWalletParams): Promise<void> {
      return Promise.resolve()
    }
  }
  return new AddWalletStub()
}

export const mockLoadWallets = (): LoadWallets => {
  class LoadWalletsStub implements LoadWallets {
    async loadAll (accountId: string): Promise<LoadWalletsResult[]> {
      return Promise.resolve(mockLoadWalletsResult())
    }
  }
  return new LoadWalletsStub()
}
