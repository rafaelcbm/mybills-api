import { GenericBusinessError } from '@/domain/errors'
import { CATEGORY_NAME_ALREADY_EXISTS } from '@/domain/errors/messages/error-messages'
import { PeriodicityEnum } from '@/domain/models'
import { AddBill } from '@/domain/usecases'
import { AddBillController, AddBillControllerRequest } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { mockAddBill, ValidationSpy } from '@/tests/presentation/mocks'
import faker from 'faker'

const mockRequest = (): AddBillControllerRequest => ({
  accountId: faker.random.word(),
  walletId: faker.random.word(),
  categoryId: faker.random.word(),
  description: faker.random.word(),
  date: faker.date.past(5),
  value: faker.random.number(),
  isDebt: faker.random.boolean(),
  isPaid: faker.random.boolean(),
  note: faker.random.words(),
  periodicity: {
    idReferenceBill: faker.random.word(),
    type: PeriodicityEnum.MONTH,
    interval: faker.random.number(),
    part: faker.random.number(),
    endPart: faker.random.number()
  }
})

type SutTypes = {
  sut: AddBillController
  validationSpy: ValidationSpy
  addBillMock: AddBill
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addBillMock = mockAddBill()
  const sut = new AddBillController(validationSpy, addBillMock)
  return {
    sut,
    validationSpy,
    addBillMock
  }
}

describe('AddBill Controller', () => {
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

  test('Should call AddBill with correct values', async () => {
    const { sut, addBillMock } = makeSut()
    const request = mockRequest()
    const spyAddBill = jest.spyOn(addBillMock, 'add')
    await sut.handle(request)
    expect(spyAddBill).toHaveBeenCalledWith(request)
  })

  test('Should throw if AddBill throws an business error', async () => {
    const { sut, addBillMock } = makeSut()
    jest.spyOn(addBillMock, 'add').mockImplementationOnce(() => { throw new GenericBusinessError(CATEGORY_NAME_ALREADY_EXISTS) })
    const httpResponse = sut.handle(mockRequest())
    await expect(httpResponse).rejects.toThrow()
  })

  test('Should throw if AddBill throws an unexpected server error', async () => {
    const { sut, addBillMock } = makeSut()
    jest.spyOn(addBillMock, 'add').mockImplementationOnce(throwError)
    const httpResponse = sut.handle(mockRequest())
    await expect(httpResponse).rejects.toThrow()
  })

  test('Should return 204, no content, on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toEqual(204)
  })
})
