import { LoadBalanceByMonthRepository, LoadBalanceByMonthRepositoryParams, LoadBalanceByMonthRepositoryResult } from '@/data/protocols'
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
