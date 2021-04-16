import { makeErrorHandlerControllerDecorator } from '@/main/factories'
import { makeDbLoadCategories } from '@/main/factories/usecases'
import { LoadCategoriesController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadCategoriesController = (): Controller => {
  const controller = new LoadCategoriesController(makeDbLoadCategories())
  return makeErrorHandlerControllerDecorator(controller)
}
