import { BillModel } from '@/domain/models'
import { AddBillParams } from '@/domain/usecases'

export type AddBillRepositoryParams = AddBillParams
export type AddBillRepositoryResult = Omit<BillModel, 'accountId'>

export interface AddBillRepository {
  add: (billParam: AddBillRepositoryParams) => Promise<AddBillRepositoryResult>
}
