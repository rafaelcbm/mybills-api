import { makeErrorHandlerControllerDecorator } from '@/main/factories'
import { makeDbLoadCategoriesTree } from '@/main/factories/usecases'
import { LoadCategoriesTreeController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadCategoriesTreeController = (): Controller => {
  const controller = new LoadCategoriesTreeController(makeDbLoadCategoriesTree())
  return makeErrorHandlerControllerDecorator(controller)
}
