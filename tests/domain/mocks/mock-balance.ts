import { AddBalanceParams, LoadBalanceByMonthResult, SaveBalancesFromAddedBills, SaveBalancesFromBillsParams } from '@/domain/usecases'
import faker from 'faker'

export const mockLoadBalanceByMonthResult = (): LoadBalanceByMonthResult => {
  return {
    id: faker.random.word(),
    yearMonth: faker.random.word(),
    balance: faker.random.number()
  }
}

export const mockAddBalanceParams = (): AddBalanceParams => {
  return {
    accountId: faker.random.word(),
    yearMonth: faker.random.word(),
    balance: faker.random.number()
  }
}

export const mockSaveBalancesFromAddedBills = (): SaveBalancesFromAddedBills => {
  class SaveBalancesFromAddedBillsStub implements SaveBalancesFromAddedBills {
    async saveBalances (billsParams: SaveBalancesFromBillsParams[]): Promise<void> {
      return Promise.resolve()
    }
  }
  return new SaveBalancesFromAddedBillsStub()
}
