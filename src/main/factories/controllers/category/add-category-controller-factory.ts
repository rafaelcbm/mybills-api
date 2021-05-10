import { makeErrorHandlerControllerDecorator } from '@/main/factories'
import { makeDbAddCategory } from '@/main/factories/usecases'
import { AddCategoryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeAddCategoryValidation } from './add-category-validation-factory'

export const makeAddCategoryController = (): Controller => {
  const controller = new AddCategoryController(makeAddCategoryValidation(), makeDbAddCategory())
  return makeErrorHandlerControllerDecorator(controller)
}
