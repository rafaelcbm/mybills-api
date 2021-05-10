import { makeErrorHandlerControllerDecorator } from '@/main/factories'
import { makeDbLoadWallets } from '@/main/factories/usecases'
import { LoadWalletsController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadWalletsController = (): Controller => {
  const controller = new LoadWalletsController(makeDbLoadWallets())
  return makeErrorHandlerControllerDecorator(controller)
}
