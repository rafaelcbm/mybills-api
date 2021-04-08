import { RemoveWallet, AddWalletParams, AddWallet } from '@/domain/usecases'
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

export const mockRemoveWallet = (): RemoveWallet => {
  class RemoveWalletStub implements RemoveWallet {
    async remove (walletId: string, accountId: string): Promise<void> {
      return Promise.resolve()
    }
  }
  return new RemoveWalletStub()
}
