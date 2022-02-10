import { BalanceModel } from '@/domain/models'
import { LoadBalanceByIdParams } from '@/domain/usecases'

export type LoadBalanceByIdRepositoryParams = LoadBalanceByIdParams

export type LoadBalanceByIdRepositoryResult = BalanceModel

export interface LoadBalanceByIdRepository {
  loadBalance: (params: LoadBalanceByIdRepositoryParams) => Promise<LoadBalanceByIdRepositoryResult>
}
