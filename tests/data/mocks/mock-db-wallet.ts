import { AddWalletRepository, AddWalletRepositoryParams, LoadWalletRepositoryResult, LoadWalletsRepository, RemoveWalletRepository, RemoveWalletRepositoryResult, UpdateWalletRepository, UpdateWalletRepositoryParams, UpdateWalletRepositoryResult } from '@/data/protocols'
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

export const mockAddWalletRepositoryParams = (accountId?: string): AddWalletRepositoryParams => {
  return {
    name: faker.random.words(),
    accountId: accountId || faker.random.word()
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
    id: faker.random.word(),
    name: faker.random.words(),
    accountId: faker.random.word()
  },
  {
    id: faker.random.word(),
    name: faker.random.words(),
    accountId: faker.random.word()
  }]
}

export const mockRemoveWalletRepository = (): RemoveWalletRepository => {
  class RemoveWalletRepositoryStub implements RemoveWalletRepository {
    async remove (walletId: string, accountId: string): Promise<RemoveWalletRepositoryResult> {
      return Promise.resolve(mockRemoveWalletRepositoryResult())
    }
  }
  return new RemoveWalletRepositoryStub()
}

export const mockRemoveWalletRepositoryResult = (): RemoveWalletRepositoryResult => {
  return {
    id: faker.random.word(),
    name: faker.random.words(),
    accountId: faker.random.word()
  }
}

export const mockUpdateWalletRepository = (): UpdateWalletRepository => {
  class UpdateWalletRepositoryStub implements UpdateWalletRepository {
    async update (updateWalletRepositoryParams: UpdateWalletRepositoryParams): Promise<UpdateWalletRepositoryResult> {
      return Promise.resolve(mockUpdateWalletRepositoryResult())
    }
  }
  return new UpdateWalletRepositoryStub()
}

export const mockUpdateWalletRepositoryParams = (accountId?: string): UpdateWalletRepositoryParams => {
  return {
    id: faker.random.word(),
    name: faker.random.words(),
    accountId: accountId || faker.random.word()
  }
}

export const mockUpdateWalletRepositoryResult = (): UpdateWalletRepositoryResult => {
  return {
    id: faker.random.word(),
    name: faker.random.words(),
    accountId: faker.random.word()
  }
}
