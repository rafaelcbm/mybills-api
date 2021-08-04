import { AddBalanceRepository, AddBalanceRepositoryParams, LoadBalanceByMonthRepository, LoadBalanceByMonthRepositoryParams, LoadBalanceByMonthRepositoryResult, LoadFutureBalancesRepository, LoadLastBalanceRepository, UpdateBalanceRepository } from '@/data/protocols'
import { BalanceModel } from '@/domain/models'
import { AddBalanceParams } from '@/domain/usecases'
import { mockBalanceModel } from '@/tests/domain/mocks'
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
    async update (balanceId: string, balanceValue: number): Promise<BalanceModel> {
      return Promise.resolve(mockUpdateBalanceRepositoryResult())
    }
  }
  return new UpdateBalanceRepositoryStub()
}

export const mockUpdateBalanceRepositoryResult = (): BalanceModel => {
  return {
    id: faker.random.word(),
    accountId: faker.random.word(),
    yearMonth: faker.random.word(),
    balance: faker.random.number()
  }
}

export const mockLoadLastBalanceRepository = (): LoadLastBalanceRepository => {
  class LoadLastBalanceRepositoryStub implements LoadLastBalanceRepository {
    async loadLastBalance (accountId: string, yearMonth: string): Promise<BalanceModel> {
      return mockBalanceModel()
    }
  }
  return new LoadLastBalanceRepositoryStub()
}

export const mockLoadFutureBalancesRepository = (): LoadFutureBalancesRepository => {
  class LoadFutureBalancesRepositoryStub implements LoadFutureBalancesRepository {
    async loadFutureBalances (accountId: string, yearMonth: string): Promise<BalanceModel[]> {
      return [mockBalanceModel(),mockBalanceModel()]
    }
  }
  return new LoadFutureBalancesRepositoryStub()
}
