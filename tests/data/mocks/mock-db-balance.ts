import { AddBalanceRepository, AddBalanceRepositoryParams, LoadBalanceByMonthRepository, LoadBalanceByMonthRepositoryParams, LoadBalanceByMonthRepositoryResult, UpdateBalanceRepository } from '@/data/protocols'
import { BalanceModel } from '@/domain/models'
import { AddBalanceParams } from '@/domain/usecases'
import faker from 'faker'

export const mockLoadBalanceByMonthRepository = (): LoadBalanceByMonthRepository => {
  class LoadBalanceByMonthRepositoryStub implements LoadBalanceByMonthRepository {
    async loadBalance (params: LoadBalanceByMonthRepositoryParams): Promise<LoadBalanceByMonthRepositoryResult> {
      return mockLoadBalanceByMonthRepositoryResult()
    }
  }
  return new LoadBalanceByMonthRepositoryStub()
}

export const mockLoadBalanceByMonthRepositoryResult = (): LoadBalanceByMonthRepositoryResult => {
  return {
    id: faker.random.word(),
    yearMonth: faker.random.word(),
    balance: faker.random.number()
  }
}

export const mockLoadBalanceByMonthRepositoryParams = (): LoadBalanceByMonthRepositoryParams => {
  return {
    accountId: faker.random.word(),
    yearMonth: faker.random.word()
  }
}

export const mockAddBalanceRepository = (): AddBalanceRepository => {
  class AddBalanceRepositoryStub implements AddBalanceRepository {
    async add (addBalanceParams: AddBalanceParams): Promise<void> {
      return Promise.resolve()
    }
  }
  return new AddBalanceRepositoryStub()
}

export const mockAddBalanceRepositoryParams = (accountId?: string): AddBalanceRepositoryParams => {
  return {
    accountId: accountId || faker.random.word(),
    yearMonth: faker.random.word(),
    balance: faker.random.number()
  }
}

export const mockUpdateBalanceRepository = (): UpdateBalanceRepository => {
  class UpdateBalanceRepositoryStub implements UpdateBalanceRepository {
    async update (accountId: string,yearMonth: string, balanceValue: number): Promise<BalanceModel> {
      return Promise.resolve(mockUpdateBalanceRepositoryResult(accountId))
    }
  }
  return new UpdateBalanceRepositoryStub()
}

export const mockUpdateBalanceRepositoryResult = (accountId: string): BalanceModel => {
  return {
    id: faker.random.word(),
    accountId: accountId || faker.random.word(),
    yearMonth: faker.random.word(),
    balance: faker.random.number()
  }
}
