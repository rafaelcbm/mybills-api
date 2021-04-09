import { UpdateWalletRepository } from '@/data/protocols'
import { DbUpdateWallet } from '@/data/usecases'
import { BadRequestError } from '@/domain/errors'
import { WALLET_NOT_FOUND } from '@/domain/errors/messages/error-messages'
import { mockWalletModel, throwError } from '@/tests/domain/mocks'
import { mockUpdateWalletRepository } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbUpdateWallet
  updateWalletRepositoryStub: UpdateWalletRepository
}

const makeSut = (): SutTypes => {
  const updateWalletRepositoryStub = mockUpdateWalletRepository()
  const sut = new DbUpdateWallet(updateWalletRepositoryStub)
  return {
    sut,
    updateWalletRepositoryStub
  }
}

describe('DbUpdateWallet Usecase', () => {
  test('should call UpdateWalletRepository with correct values ', async () => {
    const { sut, updateWalletRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateWalletRepositoryStub, 'update')
    const walletModel = mockWalletModel()
    await sut.update(walletModel)
    expect(updateSpy).toHaveBeenCalledWith(walletModel)
  })

  test('should return a valid wallet if UpdateWalletRepository returns', async () => {
    const { sut } = makeSut()
    const walletModel = mockWalletModel()
    const updatedWallet = await sut.update(walletModel)
    expect(updatedWallet).toBeTruthy()
    expect(updatedWallet.id).toBeTruthy()
    expect(updatedWallet.name).toBeTruthy()
    expect(updatedWallet.accountId).toBeTruthy()
  })

  test('Should throw if UpdateWalletRepository throws', async () => {
    const { sut, updateWalletRepositoryStub } = makeSut()
    jest.spyOn(updateWalletRepositoryStub, 'update').mockImplementationOnce(throwError)
    const walletModel = mockWalletModel()
    const promise = sut.update(walletModel)
    await expect(promise).rejects.toThrow()
  })

  test('Should throw a specific BadRequestError if can not remove wallet', async () => {
    const { sut, updateWalletRepositoryStub } = makeSut()
    jest.spyOn(updateWalletRepositoryStub, 'update').mockReturnValueOnce(Promise.resolve(null))
    const walletModel = mockWalletModel()
    const expectedErrorPromise = sut.update(walletModel)
    await expect(expectedErrorPromise).rejects.toThrowError(new BadRequestError(WALLET_NOT_FOUND))
  })
})
