import { LoadBillByIdParams, LoadBillByIdResult } from '@/domain/usecases'

export type LoadBillByIdRepositoryParams = LoadBillByIdParams

export type LoadBillsByIdRepositoryResult = LoadBillByIdResult

export interface LoadBillByIdRepository {
  loadBillById: (params: LoadBillByIdRepositoryParams) => Promise<LoadBillsByIdRepositoryResult>
}
