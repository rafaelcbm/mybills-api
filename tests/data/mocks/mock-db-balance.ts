import { AddBalanceRepository, AddBalanceRepositoryParams, LoadBalanceByMonthRepository, LoadBalanceByMonthRepositoryParams, LoadBalanceByMonthRepositoryResult } from '@/data/protocols'
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
