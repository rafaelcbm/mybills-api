import { AddWalletRepository, AddWalletRepositoryParams } from '@/data/protocols'
import { AddWalletParams } from '@/domain/usecases'
import faker from 'faker'

export const mockAddWalletRepository = (): AddWalletRepository => {
  class AddWalletRepositoryStub implements AddWalletRepository {
    async add (addWalletParams: AddWalletParams): Promise<void> {
      return Promise.resolve()
    }
  }
  return new AddWalletRepositoryStub()
}

export const mockAddWalletRepositoryParams = (): AddWalletRepositoryParams => {
  return {
    name: faker.random.words(),
    accountId: faker.random.word()
  }
}
