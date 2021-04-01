import { AddWalletRepository } from '@/data/protocols'
import { AddWalletParams } from '@/domain/usecases'

export const mockAddWalletRepository = (): AddWalletRepository => {
  class AddWalletRepositoryStub implements AddWalletRepository {
    async add (addWalletParams: AddWalletParams): Promise<void> {
      return Promise.resolve()
    }
  }
  return new AddWalletRepositoryStub()
}
