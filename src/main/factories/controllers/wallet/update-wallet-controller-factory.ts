import { makeErrorHandlerControllerDecorator } from '@/main/factories'
import { makeUpdateWalletValidation } from '@/main/factories/controllers'
import { makeDbUpdateWallet } from '@/main/factories/usecases'
import { UpdateWalletController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdateWalletController = (): Controller => {
  const controller = new UpdateWalletController(makeUpdateWalletValidation(), makeDbUpdateWallet())
  return makeErrorHandlerControllerDecorator(controller)
}
