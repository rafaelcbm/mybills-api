import { ErrorHandlerControllerDecorator } from '@/main/decorators'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { serverError, ok, badRequest } from '@/presentation/helpers'
import { LogErrorRepositorySpy } from '@/tests/data/mocks'

import faker from 'faker'
import { BadRequestError } from '@/domain/errors'
import { ServerError } from '@/presentation/errors'

class ControllerSpy implements Controller {
  httpResponse = ok(faker.random.uuid())
  request: any

  async handle (request: any): Promise<HttpResponse> {
    this.request = request
    return this.httpResponse
  }
}

const mockServerErrorResponse = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const mockBadRequestErrorResponse = (): HttpResponse => {
  const fakeBadRequestError = new BadRequestError('any error message')
  return badRequest(fakeBadRequestError)
}

type SutTypes = {
  sut: ErrorHandlerControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new ErrorHandlerControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

describe('ErrorHandlerControllerDecorator Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerSpy } = makeSut()
    const request = faker.lorem.sentence()
    await sut.handle(request)
    expect(controllerSpy.request).toEqual(request)
  })

  test('Should return the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpResponse = await sut.handle(faker.lorem.sentence())
    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })

  test('Should call LogErrorRepository with correct error if controller returns a ServerError', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const serverError = mockServerErrorResponse()
    jest.spyOn(controllerSpy, 'handle')
      .mockImplementationOnce(() => { throw new ServerError('any_stack') })
    await sut.handle(faker.lorem.sentence())
    expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack)
  })

  test('Should return a server error response with the Server Error stack thrown by the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const serverErrorResponse = mockServerErrorResponse()
    jest.spyOn(controllerSpy, 'handle')
      .mockImplementationOnce(() => { throw new ServerError('any_stack') })
    const httpResponse = await sut.handle(faker.lorem.sentence())
    expect(httpResponse).toEqual(serverErrorResponse)
  })

  test('Should return a bad request response with the BadRequestError message thrown by the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const badRequestResponse = mockBadRequestErrorResponse()
    jest.spyOn(controllerSpy, 'handle')
      .mockImplementationOnce(() => { throw new BadRequestError('any error message') })
    const httpResponse = await sut.handle(faker.lorem.sentence())
    expect(httpResponse).toEqual(badRequestResponse)
  })
})
