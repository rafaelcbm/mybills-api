import { BalanceModel } from '@/domain/models'

export interface UpdateBalance {
  update: (accountId: string,yearMonth: string, balanceValue: number) => Promise<BalanceModel>
}
