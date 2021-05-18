import { BillPeriodicityModel } from '@/domain/models'

export type AddBillParams = {
  accountId: string
  walletId: string
  categoryId: string
  description: string
  date: Date
  value: number
  isDebt: boolean
  note?: string
  periodicity?: BillPeriodicityModel
}

export interface AddBill {
  add: (bill: AddBillParams) => Promise<void>
}
