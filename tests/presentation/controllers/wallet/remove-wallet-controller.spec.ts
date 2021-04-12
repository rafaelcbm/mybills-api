import { RemoveWallet } from '@/domain/usecases'
import { RemoveWalletController, RemoveWalletControllerRequest } from '@/presentation/controllers'
import { badRequest, noContent } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { mockRemoveWallet, ValidationSpy } from '@/tests/presentation/mocks'
import faker from 'faker'

const mockRequest = (): RemoveWalletControllerRequest => ({
  accountId: faker.random.word(),
  walletId: faker.random.word()
})

type SutTypes = {
  sut: RemoveWalletController
  validationSpy: ValidationSpy
  removeWalletMock: RemoveWallet
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const removeWalletMock = mockRemoveWallet()
  const sut = new RemoveWalletController(validationSpy, removeWalletMock)
  return {
    sut,
    validationSpy,
    removeWalletMock
  }
}

describe('RemoveWallet Controller', () => {
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

  test('Should call RemoveWallet with correct values', async () => {
    const { sut, removeWalletMock } = makeSut()
    const request = mockRequest()
    const spyRemoveWallet = jest.spyOn(removeWalletMock, 'remove')
    await sut.handle(request)
    expect(spyRemoveWallet).toHaveBeenCalledWith(request.walletId, request.accountId)
  })

  test('Should return 500 if RemoveWallet throws', async () => {
    const { sut, removeWalletMock } = makeSut()
    jest.spyOn(removeWalletMock, 'remove').mockImplementationOnce(throwError)
    const httpResponse = sut.handle(mockRequest())
    await expect(httpResponse).rejects.toThrow()
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
