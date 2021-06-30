import { BalanceModel } from '@/domain/models'

export interface UpdateBalanceRepository {
  update: (accountId: string,yearMonth: string, balanceValue: number) => Promise<BalanceModel>
}
