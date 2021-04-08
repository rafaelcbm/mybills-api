import { makeDbAuthentication, makeLoginValidation, makeErrorHandlerControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeErrorHandlerControllerDecorator(controller)
}
