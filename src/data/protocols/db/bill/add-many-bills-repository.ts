import { AddBillParams } from '@/domain/usecases'

export type AddManyBillsRepositoryParams = AddBillParams

export interface AddManyBillsRepository {
  add: (billParam: AddManyBillsRepositoryParams[]) => Promise<void>
}
