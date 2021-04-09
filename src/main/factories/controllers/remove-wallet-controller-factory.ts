import { makeErrorHandlerControllerDecorator } from '@/main/factories'
import { makeRemoveWalletValidation } from '@/main/factories/controllers'
import { makeDbRemoveWallet } from '@/main/factories/usecases'
import { RemoveWalletController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeRemoveWalletController = (): Controller => {
  const controller = new RemoveWalletController(makeRemoveWalletValidation(), makeDbRemoveWallet())
  return makeErrorHandlerControllerDecorator(controller)
}
