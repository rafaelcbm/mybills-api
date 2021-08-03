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
    billsParams.forEach(async bill => {
      const loadBalanceByMonthParams: LoadBalanceByMonthParams = { accountId: bill.accountId, yearMonth: getYearMonthFromDate(bill.date) }
      const billBalance = await this.loadBalanceByMonthRepository.loadBalance(loadBalanceByMonthParams)
      if (billBalance) {
        const adjustedBalanceValue = this.adjustBalanceService.adjust(billBalance.balance, bill, null, BillOperation.INCLUDE)
        await this.updateBalanceRepository.update(billBalance.id, adjustedBalanceValue)
      } else {
        const newBalance: AddBalanceParams = {
          accountId: bill.accountId,
          balance: 0,
          yearMonth: getYearMonthFromDate(bill.date)
        }

        const lastBalance = await this.loadLastBalanceRepository.loadLastBalance(bill.accountId, getYearMonthFromDate(bill.date))
        newBalance.balance = this.adjustBalanceService.adjust(lastBalance ? lastBalance.balance : newBalance.balance,
          bill, null, BillOperation.INCLUDE)

        await this.addBalanceRepository.add(newBalance)
      }

      const futureBalances = await this.loadFutureBalancesRepository.loadFutureBalances(bill.accountId, getYearMonthFromDate(bill.date))

      futureBalances.forEach(async futureBalance => {
        futureBalance.balance = this.adjustBalanceService.adjust(futureBalance.balance, bill, null, BillOperation.INCLUDE)
        await this.updateBalanceRepository.update(futureBalance.accountId, futureBalance.balance)
      })
    })
  }
}
