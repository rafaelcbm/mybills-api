import { PeriodicityEnum, BillModel } from '@/domain/models'
import { AddBillParams, LoadBillsByMonthResult } from '@/domain/usecases'
import faker from 'faker'

export const mockAddBillParams = (): AddBillParams => {
  return {
    accountId: faker.random.word(),
    walletId: faker.random.word(),
    categoryId: faker.random.word(),
    description: faker.random.word(),
    date: faker.date.past(5),
    value: faker.random.number(),
    isDebt: faker.random.boolean(),
    isPaid: faker.random.boolean(),
    note: faker.random.words(),
    periodicity: {
      idReferenceBill: faker.random.word(),
      type: PeriodicityEnum.MONTH,
      interval: faker.random.number(),
      part: faker.random.number(),
      endPart: faker.random.number()
    }
  }
}

export const mockLoadBillsByMonthResult = (): LoadBillsByMonthResult[] => {
  return [{
    id: faker.random.word(),
    walletId: faker.random.word(),
    categoryId: faker.random.word(),
    description: faker.random.word(),
    date: faker.date.past(5),
    value: faker.random.number(),
    isDebt: faker.random.boolean(),
    isPaid: faker.random.boolean(),
    note: faker.random.words(),
    periodicity: {
      idReferenceBill: faker.random.word(),
      type: PeriodicityEnum.MONTH,
      interval: faker.random.number(),
      part: faker.random.number(),
      endPart: faker.random.number()
    }
  }, {
    id: faker.random.word(),
    walletId: faker.random.word(),
    categoryId: faker.random.word(),
    description: faker.random.word(),
    date: faker.date.past(5),
    value: faker.random.number(),
    isDebt: faker.random.boolean(),
    isPaid: faker.random.boolean(),
    note: faker.random.words(),
    periodicity: {
      idReferenceBill: faker.random.word(),
      type: PeriodicityEnum.MONTH,
      interval: faker.random.number(),
      part: faker.random.number(),
      endPart: faker.random.number()
    }
  }]
}

export const mockBillModel = (): BillModel => {
  return {
    id: faker.random.word(),
    accountId: faker.random.word(),
    walletId: faker.random.word(),
    categoryId: faker.random.word(),
    description: faker.random.word(),
    date: faker.date.past(5),
    value: faker.random.number(),
    isDebt: faker.random.boolean(),
    isPaid: faker.random.boolean(),
    note: faker.random.words(),
    periodicity: {
      idReferenceBill: faker.random.word(),
      type: PeriodicityEnum.MONTH,
      interval: faker.random.number(),
      part: faker.random.number(),
      endPart: faker.random.number()
    }
  }
}
