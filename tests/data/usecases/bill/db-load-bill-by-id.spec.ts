import { LoadBillByIdRepository } from '@/data/protocols'
import { DbLoadBillById } from '@/data/usecases'
import { LoadBillByIdParams } from '@/domain/usecases'
import { mockLoadBillByIdRepository } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadBillById
  loadBillByIdRepositoryStub: LoadBillByIdRepository
}

const makeSut = (): SutTypes => {
  const loadBillByIdRepositoryStub = mockLoadBillByIdRepository()
  const sut = new DbLoadBillById(loadBillByIdRepositoryStub)
  return {
    sut,
    loadBillByIdRepositoryStub
  }
}

describe('DbLoadBillById Usecase', () => {
  test('should call LoadBillByIdRepository with correct values ', async () => {
    const { sut, loadBillByIdRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadBillByIdRepositoryStub, 'loadBillById')

    const loadBillByIdParams: LoadBillByIdParams = {
      accountId: faker.random.word(),
      id: faker.random.word()
    }
    await sut.loadBillById(loadBillByIdParams)

    expect(loadAllSpy).toHaveBeenCalledWith(loadBillByIdParams)
  })

  test('Should throw if LoadBillByIdRepository throws', async () => {
    const { sut, loadBillByIdRepositoryStub } = makeSut()
    jest.spyOn(loadBillByIdRepositoryStub, 'loadBillById').mockImplementationOnce(throwError)
    const loadBillByIdParams: LoadBillByIdParams = {
      accountId: faker.random.word(),
      id: faker.random.word()
    }

    const promise = sut.loadBillById(loadBillByIdParams)
    await expect(promise).rejects.toThrow()
  })
})
