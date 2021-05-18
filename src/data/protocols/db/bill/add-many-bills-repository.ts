import { BillModel } from '@/domain/models'
import { AddBillParams } from '@/domain/usecases'

export type AddManyBillsRepositoryParams = AddBillParams
export type AddManyBillsRepositoryResult = Omit<BillModel, 'accountId'>

export interface AddManyBillsRepository {
  add: (billParam: AddManyBillsRepositoryParams[]) => Promise<AddManyBillsRepositoryResult[]>
}
