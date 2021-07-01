import { AdjustBalance, AdjustBalanceBill } from '@/domain/usecases/'
import { BillOperation } from '../models'

export class AdjustBalanceService implements AdjustBalance {
  adjust (balance: number, bill: AdjustBalanceBill, oldBill: AdjustBalanceBill, operation: BillOperation): number {
    let newBalance = balance

    if (operation === BillOperation.INCLUDE) {
      newBalance = newBalance + ((bill.isDebt ? -1 : 1) * bill.value)
    }

    if (operation === BillOperation.EXCLUDE) {
      newBalance = newBalance + ((bill.isDebt ? 1 : -1) * bill.value)
    }

    if (operation === BillOperation.UPDATE) {
      newBalance = newBalance + ((oldBill.isDebt ? 1 : -1) * oldBill.value) + ((bill.isDebt ? -1 : 1) * bill.value)
    }

    return Math.round((newBalance + Number.EPSILON) * 100) / 100
  }
}
