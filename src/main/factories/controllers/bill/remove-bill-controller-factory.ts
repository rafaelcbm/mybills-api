import { makeErrorHandlerControllerDecorator } from '@/main/factories'
import { makeDbRemoveBill } from '@/main/factories/usecases'
import { RemoveBillController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeRemoveBillValidation } from './remove-bill-validation-factory'

export const makeRemoveBillController = (): Controller => {
  const controller = new RemoveBillController(makeRemoveBillValidation(), makeDbRemoveBill())
  return makeErrorHandlerControllerDecorator(controller)
}
