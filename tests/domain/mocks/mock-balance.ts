import { AddBalanceParams, AdjustBalance, AdjustBalanceBill, LoadBalanceByMonthResult, SaveBalancesFromAddedBills, SaveBalancesFromBillsParams } from '@/domain/usecases'
import faker from 'faker'
import { BalanceModel, BillOperation } from '@/domain/models'

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

export const mockBalanceModel = (): BalanceModel => {
  return {
    id: faker.random.word(),
    accountId: faker.random.word(),
    yearMonth: faker.random.word(),
    balance: faker.random.number()
  }
}

export const mockAdjustBalance = (): AdjustBalance => {
  class AdjustBalanceStub implements AdjustBalance {
    adjust (balance: number, bill: AdjustBalanceBill, oldBill: AdjustBalanceBill, operation: BillOperation): number {
      return faker.random.number()
    }
  }
  return new AdjustBalanceStub()
}
