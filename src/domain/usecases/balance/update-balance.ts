import { BalanceModel } from '@/domain/models'

export interface UpdateBalance {
  update: (balanceId: string, balanceValue: number) => Promise<BalanceModel>
}
