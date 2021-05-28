import { BillModel } from '@/domain/models'

export type LoadBillsByMonthParams = {
  accountId: string
  yearMonth: string
}
export type LoadBillsByMonthResult = Omit<BillModel, 'accountId'>

export interface LoadBillsByMonth {
  loadBills: (params: LoadBillsByMonthParams) => Promise<LoadBillsByMonthResult[]>
}
