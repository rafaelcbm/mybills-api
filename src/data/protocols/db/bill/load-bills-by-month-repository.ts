import { BillModel } from '@/domain/models'
import { LoadBillsByMonthParams } from '@/domain/usecases'

export type LoadBillsByMonthParamsParams = LoadBillsByMonthParams

export type LoadBillsByMonthParamsResult = Omit<BillModel, 'accountId'>

export interface LoadBillsByMonthRepository {
  loadBills: (params: LoadBillsByMonthParamsParams) => Promise<LoadBillsByMonthParamsResult[]>
}
