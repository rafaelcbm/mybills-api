import { AddBalanceParams } from '@/domain/usecases'

export type AddBalanceRepositoryParams = AddBalanceParams

export interface AddBalanceRepository {
  add: (balanceParam: AddBalanceRepositoryParams) => Promise<void>
}
