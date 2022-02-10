export type SaveBalancesFromRemovedBillParams = {
  accountId: string
  billId: string
}

export interface SaveBalancesFromRemovedBill {
  saveBalances: (billParam: SaveBalancesFromRemovedBillParams) => Promise<void>
}
