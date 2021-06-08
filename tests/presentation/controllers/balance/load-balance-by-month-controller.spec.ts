import { LoadBalanceByMonth } from '@/domain/usecases'
import { LoadBalanceByMonthController, LoadBalanceByMonthControllerRequest } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { mockLoadBalanceByMonth, ValidationSpy } from '@/tests/presentation/mocks'
import faker from 'faker'

const mockRequest = (): LoadBalanceByMonthControllerRequest => ({
  accountId: faker.random.word(),
  yearMonth: faker.random.word()
})

type SutTypes = {
  sut: LoadBalanceByMonthController
  validationSpy: ValidationSpy
  loadBalanceByMonth: LoadBalanceByMonth
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadBalanceByMonth = mockLoadBalanceByMonth()
  const sut = new LoadBalanceByMonthController(validationSpy, loadBalanceByMonth)
  return {
    sut,
    validationSpy,
    loadBalanceByMonth: loadBalanceByMonth
  }
}

describe('LoadBalanceByMonth Controller', () => {
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

  test('Should call LoadBalanceByMonth with correct values', async () => {
    const { sut, loadBalanceByMonth } = makeSut()
    const request = mockRequest()
    const spyLoadBalanceByMonth = jest.spyOn(loadBalanceByMonth, 'loadBalance')
    await sut.handle(request)
    expect(spyLoadBalanceByMonth).toHaveBeenCalledWith(request)
  })

  test('Should return 500 if LoadBalanceByMonth throws', async () => {
    const { sut, loadBalanceByMonth } = makeSut()
    jest.spyOn(loadBalanceByMonth, 'loadBalance').mockImplementationOnce(throwError)
    const httpResponse = sut.handle(mockRequest())
    await expect(httpResponse).rejects.toThrow()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.id).toBeTruthy()
    expect(httpResponse.body.yearMonth).toBeTruthy()
    expect(httpResponse.body.balance).toBeTruthy()
    expect(httpResponse.body).not.toHaveProperty('accountId')
  })
})
