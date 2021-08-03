import { BalanceModel } from '@/domain/models'

export interface LoadLastBalanceRepository {
  loadLastBalance: (accountId: string, yearMonth: string) => Promise<BalanceModel>
}
