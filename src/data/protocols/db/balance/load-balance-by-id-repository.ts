import { BalanceModel } from '@/domain/models'
import { LoadBalanceByIdParams } from '@/domain/usecases'

export type LoadBalanceByIdRepositoryParams = LoadBalanceByIdParams

export interface LoadBalanceByIdRepository {
  loadBalanceById: (params: LoadBalanceByIdRepositoryParams) => Promise<BalanceModel>
}
