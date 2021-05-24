import { AddBillParams } from '@/domain/usecases'

export type AddManyBillsRepositoryParams = AddBillParams

export interface AddManyBillsRepository {
  addMany: (billsParam: AddManyBillsRepositoryParams[]) => Promise<void>
}
