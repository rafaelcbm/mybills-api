import { BillModel } from '@/domain/models'
import { RemoveBillParams } from '@/domain/usecases'

export type RemoveBillRepositoryParams = RemoveBillParams
export type RemoveBillRepositoryResult = BillModel

export interface RemoveBillRepository {
  remove: (billParam: RemoveBillRepositoryParams) => Promise<RemoveBillRepositoryResult>
}
