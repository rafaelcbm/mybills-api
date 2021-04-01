import { AddWallet, AddWalletParams } from '@/domain/usecases'

export const mockAddWallet = (): AddWallet => {
  class AddWalletStub implements AddWallet {
    async add (data: AddWalletParams): Promise<void> {
      return Promise.resolve()
    }
  }
  return new AddWalletStub()
}
