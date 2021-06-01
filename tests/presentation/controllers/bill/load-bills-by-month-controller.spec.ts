import { LoadBillsByMonth } from '@/domain/usecases'
import { LoadBillsByMonthController, LoadBillsByMonthControllerRequest } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { mockLoadBillsByMonth, ValidationSpy } from '@/tests/presentation/mocks'
import faker from 'faker'

const mockRequest = (): LoadBillsByMonthControllerRequest => ({
  accountId: faker.random.word(),
  yearMonth: faker.random.word()
})

type SutTypes = {
  sut: LoadBillsByMonthController
  validationSpy: ValidationSpy
  loadBillsByMonth: LoadBillsByMonth
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadBillsByMonth = mockLoadBillsByMonth()
  const sut = new LoadBillsByMonthController(validationSpy, loadBillsByMonth)
  return {
    sut,
    validationSpy,
    loadBillsByMonth: loadBillsByMonth
  }
}

describe('LoadBillsByMonth Controller', () => {
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

  test('Should call LoadBillsByMonth with correct values', async () => {
    const { sut, loadBillsByMonth } = makeSut()
    const request = mockRequest()
    const spyLoadBillsByMonth = jest.spyOn(loadBillsByMonth, 'loadBills')
    await sut.handle(request)
    expect(spyLoadBillsByMonth).toHaveBeenCalledWith(request)
  })

  test('Should return 500 if LoadBillsByMonth throws', async () => {
    const { sut, loadBillsByMonth } = makeSut()
    jest.spyOn(loadBillsByMonth, 'loadBills').mockImplementationOnce(throwError)
    const httpResponse = sut.handle(mockRequest())
    await expect(httpResponse).rejects.toThrow()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.length).toBe(2)
    expect(httpResponse.body[0].id).toBeTruthy()
    expect(httpResponse.body[0].walletId).toBeTruthy()
    expect(httpResponse.body[0].categoryId).toBeTruthy()
    expect(httpResponse.body[0].date).toBeTruthy()
    expect(httpResponse.body[0].value).toBeTruthy()
    expect(httpResponse.body[0].isDebt).not.toBeUndefined()
    expect(httpResponse.body[0].isPaid).not.toBeUndefined()
    expect(httpResponse.body[0].note).toBeTruthy()
    expect(httpResponse.body[0].periodicity.idReferenceBill).toBeTruthy()
    expect(httpResponse.body[0].periodicity.type).toBeTruthy()
    expect(httpResponse.body[0].periodicity.interval).toBeTruthy()
    expect(httpResponse.body[0].periodicity.part).toBeTruthy()
    expect(httpResponse.body[0].periodicity.endPart).toBeTruthy()
  })
})
