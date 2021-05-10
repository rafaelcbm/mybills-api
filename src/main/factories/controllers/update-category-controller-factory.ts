import { makeErrorHandlerControllerDecorator } from '@/main/factories'
import { makeUpdateCategoryValidation } from '@/main/factories/controllers'
import { makeDbUpdateCategory } from '@/main/factories/usecases'
import { UpdateCategoryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdateCategoryController = (): Controller => {
  const controller = new UpdateCategoryController(makeUpdateCategoryValidation(), makeDbUpdateCategory())
  return makeErrorHandlerControllerDecorator(controller)
}
