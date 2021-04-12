import { AddWalletRepository } from '@/data/protocols'
import { DbAddWallet } from '@/data/usecases'
import { mockAddWalletRepository } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import { mockAddWalletParams } from '@/tests/domain/mocks/mock-wallet'

type SutTypes = {
  sut: DbAddWallet
  addWalletRepositoryStub: AddWalletRepository
}

const makeSut = (): SutTypes => {
  const addWalletRepositoryStub = mockAddWalletRepository()
  const sut = new DbAddWallet(addWalletRepositoryStub)
  return {
    sut,
    addWalletRepositoryStub
  }
}

describe('DbAddWallet Usecase', () => {
  test('should call AddWalletRepository with correct values ', async () => {
    const { sut, addWalletRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(addWalletRepositoryStub, 'add')
    const addWalletParam = mockAddWalletParams()
    await sut.add(addWalletParam)

    expect(addSpy).toHaveBeenCalledWith(addWalletParam)
  })

  test('Should throw if AddWalletRepository throws', async () => {
    const { sut, addWalletRepositoryStub } = makeSut()
    jest.spyOn(addWalletRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddWalletParams())
    await expect(promise).rejects.toThrow()
  })
})
