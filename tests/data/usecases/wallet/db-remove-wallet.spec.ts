import { RemoveWalletRepository } from '@/data/protocols'
import { DbRemoveWallet } from '@/data/usecases'
import { GenericBusinessError } from '@/domain/errors'
import { WALLET_NOT_FOUND } from '@/domain/errors/messages/error-messages'
import { mockRemoveWalletRepository } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbRemoveWallet
  removeWalletRepositoryStub: RemoveWalletRepository
}

const makeSut = (): SutTypes => {
  const removeWalletRepositoryStub = mockRemoveWalletRepository()
  const sut = new DbRemoveWallet(removeWalletRepositoryStub)
  return {
    sut,
    removeWalletRepositoryStub
  }
}

describe('DbRemoveWallet Usecase', () => {
  test('should call RemoveWalletRepository with correct values ', async () => {
    const { sut, removeWalletRepositoryStub } = makeSut()
    const removeSpy = jest.spyOn(removeWalletRepositoryStub, 'remove')
    const accountId = faker.random.word()
    const walletId = faker.random.word()
    await sut.remove(accountId, walletId)
    expect(removeSpy).toHaveBeenCalledWith(accountId, walletId)
  })

  test('Should throw if RemoveWalletRepository throws', async () => {
    const { sut, removeWalletRepositoryStub } = makeSut()
    jest.spyOn(removeWalletRepositoryStub, 'remove').mockImplementationOnce(throwError)
    const accountId = faker.random.word()
    const walletId = faker.random.word()
    const promise = sut.remove(accountId, walletId)
    await expect(promise).rejects.toThrow()
  })

  test('Should throw a specific BadRequestError if can not remove wallet', async () => {
    const { sut, removeWalletRepositoryStub } = makeSut()
    jest.spyOn(removeWalletRepositoryStub, 'remove').mockReturnValueOnce(Promise.resolve(null))
    const accountId = faker.random.word()
    const walletId = faker.random.word()
    const expectedErrorPromise = sut.remove(accountId, walletId)
    await expect(expectedErrorPromise).rejects.toThrowError(new GenericBusinessError(WALLET_NOT_FOUND))
  })
})
