import { BalanceModel } from '@/domain/models'

export type LoadBalanceByIdParams = {
  accountId: string
  id: string
}

export type LoadBalanceByIdResult = BalanceModel

export interface LoadBalanceById {
  loadBalance: (params: LoadBalanceByIdParams) => Promise<LoadBalanceByIdResult>
}
