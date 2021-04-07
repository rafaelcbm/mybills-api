import { AddWalletRepository, AddWalletRepositoryParams, LoadWalletsRepository, LoadWalletRepositoryResult } from '@/data/protocols'
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

export const mockLoadWalletsRepository = (): LoadWalletsRepository => {
  class LoadWalletRepositoryStub implements LoadWalletsRepository {
    async loadAll (accountId: string): Promise<LoadWalletRepositoryResult[]> {
      return mockLoadWalletRepositoryResult()
    }
  }
  return new LoadWalletRepositoryStub()
}

export const mockLoadWalletRepositoryResult = (): LoadWalletRepositoryResult[] => {
  return [{
    name: faker.random.words(),
    accountId: faker.random.word()
  },
  {
    name: faker.random.words(),
    accountId: faker.random.word()
  }]
}
