import { makeErrorHandlerControllerDecorator } from '@/main/factories'
import { makeDbAddBill } from '@/main/factories/usecases'
import { AddBillController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeAddBillValidation } from './add-bill-validation-factory'

export const makeAddBillController = (): Controller => {
  const controller = new AddBillController(makeAddBillValidation(), makeDbAddBill())
  return makeErrorHandlerControllerDecorator(controller)
}
