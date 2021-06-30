import { BalanceModel } from '@/domain/models'

export interface UpdateBalanceRepository {
  update: (balanceId: string, balanceValue: number) => Promise<BalanceModel>
}
