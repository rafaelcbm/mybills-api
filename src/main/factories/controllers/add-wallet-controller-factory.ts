import { makeLogControllerDecorator } from '@/main/factories'
import { AddWalletController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbAddWallet } from '../usecases/add-wallet-factory'
import { makeAddWalletValidation } from './add-wallet-validation-factory'

export const makeAddWalletController = (): Controller => {
  const controller = new AddWalletController(makeAddWalletValidation(), makeDbAddWallet())
  return makeLogControllerDecorator(controller)
}
