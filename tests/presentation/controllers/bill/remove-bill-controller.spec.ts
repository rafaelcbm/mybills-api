import { GenericBusinessError } from '@/domain/errors'
import { BILL_NOT_FOUND } from '@/domain/errors/messages/error-messages'
import { RemoveBill } from '@/domain/usecases'
import { RemoveBillController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { mockRemoveBill, ValidationSpy } from '@/tests/presentation/mocks'
import faker from 'faker'
import { RemoveBillControllerRequest } from './remove-bill-controller'

const mockRequest = (): RemoveBillControllerRequest => ({
  accountId: faker.random.word(),
  billId: faker.random.word()
})

type SutTypes = {
  sut: RemoveBillController
  validationSpy: ValidationSpy
  removeBillMock: RemoveBill
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const removeBillMock = mockRemoveBill()
  const sut = new RemoveBillController(validationSpy, removeBillMock)
  return {
    sut,
    validationSpy,
    removeBillMock: removeBillMock
  }
}

describe('RemoveBill Controller', () => {
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

  test('Should call RemoveBill with correct values', async () => {
    const { sut, removeBillMock } = makeSut()
    const request = mockRequest()
    const spyRemoveBill = jest.spyOn(removeBillMock, 'remove')
    await sut.handle(request)
    expect(spyRemoveBill).toHaveBeenCalledWith(request)
  })

  test('Should throw if RemoveBill throws an business error', async () => {
    const { sut, removeBillMock } = makeSut()
    jest.spyOn(removeBillMock, 'remove').mockImplementationOnce(() => { throw new GenericBusinessError(BILL_NOT_FOUND) })
    const httpResponse = sut.handle(mockRequest())
    await expect(httpResponse).rejects.toThrow()
  })

  test('Should throw if RemoveBill throws an unexpected server error', async () => {
    const { sut, removeBillMock } = makeSut()
    jest.spyOn(removeBillMock, 'remove').mockImplementationOnce(throwError)
    const httpResponse = sut.handle(mockRequest())
    await expect(httpResponse).rejects.toThrow()
  })

  test('Should return 204, no content, on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toEqual(204)
  })
})
