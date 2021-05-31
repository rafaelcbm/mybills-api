import { BillModel } from '@/domain/models'
import { LoadBillsByMonthParams } from '@/domain/usecases'

export type LoadBillsByMonthRepositoryParams = LoadBillsByMonthParams

export type LoadBillsByMonthRepositoryResult = Omit<BillModel, 'accountId'>

export interface LoadBillsByMonthRepository {
  loadBills: (params: LoadBillsByMonthRepositoryParams) => Promise<LoadBillsByMonthRepositoryResult[]>
}
