import { LoadBalanceByMonthRepository, LoadBillByIdRepository, LoadFutureBalancesRepository, UpdateBalanceRepository } from '@/data/protocols'
import { BillOperation } from '@/domain/models'
import { AdjustBalance, LoadBalanceByMonthParams } from '@/domain/usecases'
import { SaveBalancesFromRemovedBill, SaveBalancesFromRemovedBillParams } from '@/domain/usecases/balance/save-balances-from-removed-bill'
import { getYearMonthFromDate } from '@/domain/util'

export class DbSaveBalancesFromRemovedBill implements SaveBalancesFromRemovedBill {
  constructor(
    private readonly loadBillByIdRepository: LoadBillByIdRepository,
    private readonly loadBalanceByMonthRepository: LoadBalanceByMonthRepository,
    private readonly adjustBalanceService: AdjustBalance,
    private readonly updateBalanceRepository: UpdateBalanceRepository,
    private readonly loadFutureBalancesRepository: LoadFutureBalancesRepository
  ) { }

  async saveBalances(billParam: SaveBalancesFromRemovedBillParams): Promise<void> {
    const bill = await this.loadBillByIdRepository.loadBillById({ accountId: billParam.accountId, id: billParam.billId })

    // Obter Balance da Bill
    const loadBalanceByMonthParams: LoadBalanceByMonthParams = { accountId: billParam.accountId, yearMonth: getYearMonthFromDate(bill.date) }
    const billBalance = await this.loadBalanceByMonthRepository.loadBalance(loadBalanceByMonthParams)

    // Ajustar o Balance/Balances futuros
    const adjustedBalanceValue = this.adjustBalanceService.adjust(billBalance.balance, { value: bill.value, isDebt: bill.isDebt }, null, BillOperation.EXCLUDE)
    await this.updateBalanceRepository.update(billBalance.id, adjustedBalanceValue)

    const futureBalances = await this.loadFutureBalancesRepository.loadFutureBalances(billParam.accountId, getYearMonthFromDate(bill.date))

    for (let j = 0; j < futureBalances.length; j++) {
      futureBalances[j].balance = this.adjustBalanceService.adjust(futureBalances[j].balance, { value: bill.value, isDebt: bill.isDebt }, null, BillOperation.EXCLUDE)
      await this.updateBalanceRepository.update(futureBalances[j].id, futureBalances[j].balance)
    }
  }
}
