import { AddWallet } from '@/domain/usecases'
import faker from 'faker'
import { AddWalletController, AddWalletControllerResquest } from '@/presentation/controllers'
import { mockAddWallet, ValidationSpy } from '../mocks'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'

const mockRequest = (): AddWalletControllerResquest => ({
  accountId: faker.random.word(),
  name: faker.random.words()
})

type SutTypes = {
  sut: AddWalletController
  validationSpy: ValidationSpy
  addWalletMock: AddWallet
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addWalletMock = mockAddWallet()
  const sut = new AddWalletController(validationSpy, addWalletMock)
  return {
    sut,
    validationSpy,
    addWalletMock
  }
}

describe('AddWallet Controller', () => {
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

  test('Should call AddWallet with correct values', async () => {
    const { sut, addWalletMock } = makeSut()
    const request = mockRequest()
    const spyAddWallet = jest.spyOn(addWalletMock, 'add')
    await sut.handle(request)
    expect(spyAddWallet).toHaveBeenCalledWith(request)
  })

  test('Should return 500 if AddWallet throws', async () => {
    const { sut, addWalletMock } = makeSut()
    jest.spyOn(addWalletMock, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
