export type BillModel = {
  id: string
  accountId: string
  walletId: string
  categoryId: string
  description: string
  date: Date
  value: number
  isDebt: boolean
  isPaid: boolean
  note?: string
  periodicity?: BillPeriodicityModel
}

export type BillPeriodicityModel = {
  idReferenceBill: string
  type: PeriodicityEnum
  interval: number
  part: number
  endPart: number
}

export enum PeriodicityEnum {
  DAY,
  WEEK,
  MONTH,
  YEAR,
}
