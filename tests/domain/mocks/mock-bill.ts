import { AddBillParams } from '@/domain/usecases'
import { PeriodicityEnum } from '@/domain/models'
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
