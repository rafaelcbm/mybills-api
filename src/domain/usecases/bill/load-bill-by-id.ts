import { BillModel } from '@/domain/models'

export type LoadBillByIdParams = {
  accountId: string
  id: string
}

export type LoadBillByIdResult = Omit<BillModel, 'accountId'>

export interface LoadBillById {
  loadBillById: (params: LoadBillByIdParams) => Promise<LoadBillByIdResult>
}
