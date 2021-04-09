import { UpdateWallet } from '@/domain/usecases'
import { UpdateWalletController, UpdateWalletControllerRequest } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { mockUpdateWallet, ValidationSpy } from '@/tests/presentation/mocks'
import faker from 'faker'

const mockRequest = (): UpdateWalletControllerRequest => ({
  accountId: faker.random.word(),
  walletId: faker.random.word(),
  name: faker.random.word()
})

type SutTypes = {
  sut: UpdateWalletController
  validationSpy: ValidationSpy
  updateWalletMock: UpdateWallet
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const updateWalletMock = mockUpdateWallet()
  const sut = new UpdateWalletController(validationSpy, updateWalletMock)
  return {
    sut,
    validationSpy,
    updateWalletMock
  }
}

describe('UpdateWallet Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call UpdateWallet with correct values', async () => {
    const { sut, updateWalletMock } = makeSut()
    const request = mockRequest()
    const spyUpdateWallet = jest.spyOn(updateWalletMock, 'update')
    await sut.handle(request)
    expect(spyUpdateWallet).toHaveBeenCalledWith({ id: request.walletId, accountId: request.accountId, name: request.name })
  })

  test('Should return 500 if UpdateWallet throws', async () => {
    const { sut, updateWalletMock } = makeSut()
    jest.spyOn(updateWalletMock, 'update').mockImplementationOnce(throwError)
    const httpResponse = sut.handle(mockRequest())
    await expect(httpResponse).rejects.toThrow()
  })

  test('Should return 200 on success with wallet data', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toEqual(200)
    expect(httpResponse.body.id).toBeTruthy()
    expect(httpResponse.body.accountId).toBeTruthy()
    expect(httpResponse.body.name).toBeTruthy()
  })
})
