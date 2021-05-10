import { makeErrorHandlerControllerDecorator , makeAddWalletValidation } from '@/main/factories'
import { AddWalletController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbAddWallet } from '@/main/factories/usecases'

export const makeAddWalletController = (): Controller => {
  const controller = new AddWalletController(makeAddWalletValidation(), makeDbAddWallet())
  return makeErrorHandlerControllerDecorator(controller)
}
