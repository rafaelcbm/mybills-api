import { ErrorHandlerControllerDecorator } from '@/main/decorators'
import { LogMongoRepository } from '@/infra/db'
import { Controller } from '@/presentation/protocols'

export const makeErrorHandlerControllerDecorator = (controller: Controller): Controller => {
  const logMongoRepository = new LogMongoRepository()
  return new ErrorHandlerControllerDecorator(controller, logMongoRepository)
}
