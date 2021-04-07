import { LoadWallets } from '@/domain/usecases/load-wallets'
import { LoadWalletsController, LoadWalletsControllerRequest } from '@/presentation/controllers'
import { ok, serverError } from '@/presentation/helpers'
import { mockLoadWalletsResult, throwError } from '@/tests/domain/mocks'
import faker from 'faker'
import { mockLoadWallets } from '../mocks'

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
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.length).toBe(2)
  })
})
