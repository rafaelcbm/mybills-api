import { AddBillRepository, AddBillRepositoryParams, AddBillRepositoryResult, AddManyBillsRepository, AddManyBillsRepositoryParams } from '@/data/protocols'
import { PeriodicityEnum } from '@/domain/models'
import { AddBillParams } from '@/domain/usecases'
import faker from 'faker'

export const mockAddBillRepository = (): AddBillRepository => {
  class AddBillRepositoryStub implements AddBillRepository {
    async add (addBillParams: AddBillParams): Promise<AddBillRepositoryResult> {
      return mockAddBillRepositoryResult()
    }
  }
  return new AddBillRepositoryStub()
}

export const mockAddBillRepositoryParams = (accountId?: string): AddBillRepositoryParams => {
  return {
    accountId: accountId || faker.random.word(),
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

export const mockAddBillRepositoryResult = (): AddBillRepositoryResult => {
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

export const mockAddManyBillsRepository = (): AddManyBillsRepository => {
  class AddManyBillsRepositoryStub implements AddManyBillsRepository {
    async addMany (addBillParams: AddManyBillsRepositoryParams[]): Promise<void> {

    }
  }
  return new AddManyBillsRepositoryStub()
}
