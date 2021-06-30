import { AddBalanceRepository } from '@/data/protocols'
import { DbAddBalance } from '@/data/usecases'
import { mockAddBalanceRepository } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import { mockAddBalanceParams } from '@/tests/domain/mocks/mock-balance'

type SutTypes = {
  sut: DbAddBalance
  addBalanceRepositoryStub: AddBalanceRepository
}

const makeSut = (): SutTypes => {
  const addBalanceRepositoryStub = mockAddBalanceRepository()
  const sut = new DbAddBalance(addBalanceRepositoryStub)
  return {
    sut,
    addBalanceRepositoryStub
  }
}

describe('DbAddBalance Usecase', () => {
  test('should call AddBalanceRepository with correct values ', async () => {
    const { sut, addBalanceRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(addBalanceRepositoryStub, 'add')
    const addBalanceParam = mockAddBalanceParams()
    await sut.add(addBalanceParam)

    expect(addSpy).toHaveBeenCalledWith(addBalanceParam)
  })

  test('Should throw if AddBalanceRepository throws', async () => {
    const { sut, addBalanceRepositoryStub } = makeSut()
    jest.spyOn(addBalanceRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddBalanceParams())
    await expect(promise).rejects.toThrow()
  })
})
