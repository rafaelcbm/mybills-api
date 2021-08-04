import { AddBalanceRepository, LoadBalanceByMonthRepository, LoadFutureBalancesRepository, LoadLastBalanceRepository, UpdateBalanceRepository } from '@/data/protocols'
import { BillOperation } from '@/domain/models'
import { AddBalanceParams, AdjustBalance, LoadBalanceByMonthParams, SaveBalancesFromAddedBills, SaveBalancesFromBillsParams } from '@/domain/usecases/'
import { getYearMonthFromDate } from '@/domain/util'

export class DbSaveBalancesFromBills implements SaveBalancesFromAddedBills {
  constructor (
    private readonly addBalanceRepository: AddBalanceRepository,
    private readonly updateBalanceRepository: UpdateBalanceRepository,
    private readonly loadBalanceByMonthRepository: LoadBalanceByMonthRepository,
    private readonly loadLastBalanceRepository: LoadLastBalanceRepository,
    private readonly loadFutureBalancesRepository: LoadFutureBalancesRepository,
    private readonly adjustBalanceService: AdjustBalance
  ) {}

  async saveBalances (billsParams: SaveBalancesFromBillsParams[]): Promise<void> {
    for (let i = 0; i < billsParams.length; i++) {
      const loadBalanceByMonthParams: LoadBalanceByMonthParams = { accountId: billsParams[i].accountId, yearMonth: getYearMonthFromDate(billsParams[i].date) }
      const billBalance = await this.loadBalanceByMonthRepository.loadBalance(loadBalanceByMonthParams)

      if (billBalance) {
        const adjustedBalanceValue = this.adjustBalanceService.adjust(billBalance.balance, billsParams[i], null, BillOperation.INCLUDE)
        await this.updateBalanceRepository.update(billBalance.id, adjustedBalanceValue)
      } else {
        const newBalance: AddBalanceParams = {
          accountId: billsParams[i].accountId,
          balance: 0,
          yearMonth: getYearMonthFromDate(billsParams[i].date)
        }

        const lastBalance = await this.loadLastBalanceRepository.loadLastBalance(billsParams[i].accountId, getYearMonthFromDate(billsParams[i].date))
        newBalance.balance = this.adjustBalanceService.adjust(lastBalance ? lastBalance.balance : newBalance.balance,
          billsParams[i], null, BillOperation.INCLUDE)

        await this.addBalanceRepository.add(newBalance)
      }

      const futureBalances = await this.loadFutureBalancesRepository.loadFutureBalances(billsParams[i].accountId, getYearMonthFromDate(billsParams[i].date))

      for (let j = 0; j < futureBalances.length; j++) {
        futureBalances[j].balance = this.adjustBalanceService.adjust(futureBalances[j].balance, billsParams[i], null, BillOperation.INCLUDE)
        await this.updateBalanceRepository.update(futureBalances[j].id, futureBalances[j].balance)
      }
    }
  }
}
