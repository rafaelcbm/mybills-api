import { WalletModel } from '@/domain/models'
import { RemoveWallet, AddWalletParams, AddWallet, UpdateWallet } from '@/domain/usecases'
import { LoadWallets, LoadWalletsResult } from '@/domain/usecases/load-wallets'
import { mockLoadWalletsResult , mockWalletModel } from '@/tests/domain/mocks'

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

export const mockUpdateWallet = (): UpdateWallet => {
  class UpdateWalletStub implements UpdateWallet {
    async update (updateWalletParams: WalletModel): Promise<WalletModel> {
      return mockWalletModel()
    }
  }
  return new UpdateWalletStub()
}
