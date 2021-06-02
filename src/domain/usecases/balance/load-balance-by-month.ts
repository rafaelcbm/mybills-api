import { BalanceModel } from '@/domain/models'

export type LoadBalanceByMonthParams = {
  accountId: string
  yearMonth: string
}
export type LoadBalanceByMonthResult = Omit<BalanceModel, 'accountId'>

export interface LoadBalanceByMonth {
  loadBalance: (params: LoadBalanceByMonthParams) => Promise<LoadBalanceByMonthResult>
}
