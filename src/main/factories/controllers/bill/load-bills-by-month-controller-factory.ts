import { makeErrorHandlerControllerDecorator } from '@/main/factories'
import { makeDbLoadBillsByMonth } from '@/main/factories/usecases'
import { LoadBillsByMonthController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeLoadBillsByMonthValidation } from './load-bills-by-month-validation-factory'

export const makeLoadBillsByMonthController = (): Controller => {
  const controller = new LoadBillsByMonthController(makeLoadBillsByMonthValidation(), makeDbLoadBillsByMonth())
  return makeErrorHandlerControllerDecorator(controller)
}
