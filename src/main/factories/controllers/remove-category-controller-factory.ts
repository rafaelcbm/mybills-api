import { makeErrorHandlerControllerDecorator } from '@/main/factories'
import { makeRemoveCategoryValidation } from '@/main/factories/controllers'
import { makeDbRemoveCategory } from '@/main/factories/usecases'
import { RemoveCategoryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeRemoveCategoryController = (): Controller => {
  const controller = new RemoveCategoryController(makeRemoveCategoryValidation(), makeDbRemoveCategory())
  return makeErrorHandlerControllerDecorator(controller)
}
