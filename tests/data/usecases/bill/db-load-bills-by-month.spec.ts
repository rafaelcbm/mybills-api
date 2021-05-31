import { LoadBillsByMonthRepository } from '@/data/protocols'
import { DbLoadBillsByMonth } from '@/data/usecases'
import { LoadBillsByMonthParams } from '@/domain/usecases'
import { mockLoadBillsByMonthRepository } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadBillsByMonth
  loadBillsByMonthRepositoryStub: LoadBillsByMonthRepository
}

const makeSut = (): SutTypes => {
  const loadBillsByMonthRepositoryStub = mockLoadBillsByMonthRepository()
  const sut = new DbLoadBillsByMonth(loadBillsByMonthRepositoryStub)
  return {
    sut,
    loadBillsByMonthRepositoryStub
  }
}

describe('DbLoadBillsByMonth Usecase', () => {
  test('should call LoadBillsByMonthRepository with correct values ', async () => {
    const { sut, loadBillsByMonthRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadBillsByMonthRepositoryStub, 'loadBills')

    const loadBillsByMonthParams: LoadBillsByMonthParams = {
      accountId: faker.random.word(),
      yearMonth: faker.random.word()
    }
    await sut.loadBills(loadBillsByMonthParams)

    expect(loadAllSpy).toHaveBeenCalledWith(loadBillsByMonthParams)
  })

  test('Should throw if LoadBillsByMonthRepository throws', async () => {
    const { sut, loadBillsByMonthRepositoryStub } = makeSut()
    jest.spyOn(loadBillsByMonthRepositoryStub, 'loadBills').mockImplementationOnce(throwError)
    const loadBillsByMonthParams: LoadBillsByMonthParams = {
      accountId: faker.random.word(),
      yearMonth: faker.random.word()
    }

    const promise = sut.loadBills(loadBillsByMonthParams)
    await expect(promise).rejects.toThrow()
  })
})
