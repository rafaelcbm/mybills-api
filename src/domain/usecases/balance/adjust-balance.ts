import { BillOperation } from '@/domain/models'

export type AdjustBalanceBill = {
  value: number
  isDebt: boolean
}

export interface AdjustBalance {
  adjust: (balance: number, bill: AdjustBalanceBill, oldBill: AdjustBalanceBill, operation: BillOperation) => number
}
