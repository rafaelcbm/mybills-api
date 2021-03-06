import { AddBillRepository, AddBillRepositoryParams, AddBillRepositoryResult, AddManyBillsRepository, AddManyBillsRepositoryParams, LoadBillsByMonthRepositoryParams, LoadBillsByMonthRepositoryResult, LoadBillsByMonthRepository, LoadBillByIdRepository, LoadBillByIdRepositoryParams, LoadBillsByIdRepositoryResult, RemoveBillRepository } from '@/data/protocols'
import { BillModel, PeriodicityEnum } from '@/domain/models'
import { AddBillParams } from '@/domain/usecases'
import { mockBillModel } from '@/tests/domain/mocks'
import faker from 'faker'

export const mockAddBillRepository = (): AddBillRepository => {
  class AddBillRepositoryStub implements AddBillRepository {
    async add(addBillParams: AddBillParams): Promise<AddBillRepositoryResult> {
      return mockAddBillRepositoryResult()
    }
  }
  return new AddBillRepositoryStub()
}

export const mockAddBillRepositoryParams = (accountId?: string, date?: Date): AddBillRepositoryParams => {
  return {
    accountId: accountId || faker.random.word(),
    walletId: faker.random.word(),
    categoryId: faker.random.word(),
    description: faker.random.word(),
    date: date || faker.date.past(5),
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
    async addMany(addBillParams: AddManyBillsRepositoryParams[]): Promise<void> {

    }
  }
  return new AddManyBillsRepositoryStub()
}

export const mockLoadBillsByMonthRepository = (): LoadBillsByMonthRepository => {
  class LoadBillsByMonthRepositoryStub implements LoadBillsByMonthRepository {
    async loadBills(params: LoadBillsByMonthRepositoryParams): Promise<LoadBillsByMonthRepositoryResult[]> {
      return mockLoadBillsByMonthRepositoryResult()
    }
  }
  return new LoadBillsByMonthRepositoryStub()
}

export const mockLoadBillsByMonthRepositoryResult = (): LoadBillsByMonthRepositoryResult[] => {
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
  }]
}

export const mockLoadBillByIdRepository = (): LoadBillByIdRepository => {
  class LoadBillByIdRepositoryStub implements LoadBillByIdRepository {
    async loadBillById(params: LoadBillByIdRepositoryParams): Promise<LoadBillsByIdRepositoryResult> {
      return mockLoadBillByIdRepositoryResult()
    }
  }
  return new LoadBillByIdRepositoryStub()
}

export const mockLoadBillByIdRepositoryResult = (): LoadBillsByIdRepositoryResult => {
  return {
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
  }
}

export const mockRemoveBillRepository = (): RemoveBillRepository => {
  class RemoveBillRepositoryStub implements RemoveBillRepository {
    async remove(accountId: string, billId: string): Promise<BillModel> {
      return Promise.resolve(mockBillModel())
    }
  }
  return new RemoveBillRepositoryStub()
}
