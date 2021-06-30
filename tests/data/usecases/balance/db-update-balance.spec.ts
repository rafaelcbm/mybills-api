import { UpdateBalanceRepository } from '@/data/protocols'
import { DbUpdateBalance } from '@/data/usecases'
import { mockUpdateBalanceRepository } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbUpdateBalance
  updateBalanceRepositoryStub: UpdateBalanceRepository
}

const makeSut = (): SutTypes => {
  const updateBalanceRepositoryStub = mockUpdateBalanceRepository()
  const sut = new DbUpdateBalance(updateBalanceRepositoryStub)
  return {
    sut,
    updateBalanceRepositoryStub
  }
}

describe('DbUpdateBalance Usecase', () => {
  test('should call UpdateBalanceRepository with correct values ', async () => {
    const { sut, updateBalanceRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateBalanceRepositoryStub, 'update')
    const accountId = faker.random.word()
    const yearMonth = faker.random.word()
    const balance = faker.random.number()
    await sut.update(accountId, yearMonth, balance)
    expect(updateSpy).toHaveBeenCalledWith(accountId, yearMonth, balance)
  })

  test('should return a valid balance if UpdateBalanceRepository returns', async () => {
    const { sut } = makeSut()
    const accountId = faker.random.word()
    const yearMonth = faker.random.word()
    const balance = faker.random.number()
    const updatedBalance = await sut.update(accountId, yearMonth, balance)
    expect(updatedBalance).toBeTruthy()
    expect(updatedBalance.id).toBeTruthy()
    expect(updatedBalance.accountId).toBeTruthy()
    expect(updatedBalance.yearMonth).toBeTruthy()
    expect(updatedBalance.balance).toBeTruthy()
  })

  test('Should throw if UpdateBalanceRepository throws', async () => {
    const { sut, updateBalanceRepositoryStub } = makeSut()
    jest.spyOn(updateBalanceRepositoryStub, 'update').mockImplementationOnce(throwError)

    const accountId = faker.random.word()
    const yearMonth = faker.random.word()
    const balance = faker.random.number()

    const promise = sut.update(accountId, yearMonth, balance)
    await expect(promise).rejects.toThrow()
  })
})
