import { BalanceModel } from '@/domain/models'

export interface LoadFutureBalancesRepository {
  loadFutureBalances: (accountId: string, yearMonth: string) => Promise<BalanceModel[]>
}
