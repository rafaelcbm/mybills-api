export type RemoveBillParams = {
  accountId: string
  billId: string
}

export interface RemoveBill {
  remove: (bill: RemoveBillParams) => Promise<void>
}
