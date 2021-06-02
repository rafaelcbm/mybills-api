import { BalanceModel } from '@/domain/models'
import { LoadBalanceByMonthParams } from '@/domain/usecases'

export type LoadBalanceByMonthRepositoryParams = LoadBalanceByMonthParams

export type LoadBalanceByMonthRepositoryResult = Omit<BalanceModel, 'accountId'>

export interface LoadBalanceByMonthRepository {
  loadBalance: (params: LoadBalanceByMonthRepositoryParams) => Promise<LoadBalanceByMonthRepositoryResult>
}
