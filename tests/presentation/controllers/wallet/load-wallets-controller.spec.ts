import { LoadWallets } from '@/domain/usecases/wallet/load-wallets'
import { LoadWalletsController, LoadWalletsControllerRequest } from '@/presentation/controllers'
import { throwError } from '@/tests/domain/mocks'
import { mockLoadWallets } from '@/tests/presentation/mocks'
import faker from 'faker'

const mockRequest = (): LoadWalletsControllerRequest => ({
  accountId: faker.random.word()
})

type SutTypes = {
  sut: LoadWalletsController
  loadWalletsMock: LoadWallets
}

const makeSut = (): SutTypes => {
  const loadWalletsMock = mockLoadWallets()
  const sut = new LoadWalletsController(loadWalletsMock)
  return {
    sut,
    loadWalletsMock
  }
}

describe('LoadWallets Controller', () => {
  test('Should call LoadWallets with correct values', async () => {
    const { sut, loadWalletsMock } = makeSut()
    const request = mockRequest()
    const spyAddWallet = jest.spyOn(loadWalletsMock, 'loadAll')
    await sut.handle(request)
    expect(spyAddWallet).toHaveBeenCalledWith(request.accountId)
  })

  test('Should return 500 if LoadWallets throws', async () => {
    const { sut, loadWalletsMock } = makeSut()
    jest.spyOn(loadWalletsMock, 'loadAll').mockImplementationOnce(throwError)
    const httpResponse = sut.handle(mockRequest())
    await expect(httpResponse).rejects.toThrow()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.length).toBe(2)
  })
})
