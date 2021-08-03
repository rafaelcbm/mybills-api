import { BillModel } from '@/domain/models'

export type SaveBalancesFromBillsParams = Omit<BillModel, 'id'>

export interface SaveBalancesFromAddedBills {
  saveBalances: (billsParams: SaveBalancesFromBillsParams[]) => Promise<void>
}
