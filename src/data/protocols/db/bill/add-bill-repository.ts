import { BillModel } from '@/domain/models'
import { AddBillParams } from '@/domain/usecases'

export type AddBillRepositoryParams = AddBillParams
export type AddBillRepositoryResult = BillModel

export interface AddBillRepository {
  add: (billParam: AddBillRepositoryParams) => Promise<AddBillRepositoryResult>
}
