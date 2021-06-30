import { BalanceModel } from '@/domain/models'

export type AddBalanceParams = Omit<BalanceModel, 'id'>

export interface AddBalance {
  add: (balance: AddBalanceParams) => Promise<void>
}
