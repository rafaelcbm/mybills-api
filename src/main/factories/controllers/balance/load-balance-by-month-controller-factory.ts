import { makeErrorHandlerControllerDecorator } from '@/main/factories'
import { makeDbLoadBalanceByMonth } from '@/main/factories/usecases'
import { LoadBalanceByMonthController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeLoadBalanceByMonthValidation } from './load-balance-by-month-validation-factory'

export const makeLoadBalanceByMonthController = (): Controller => {
  const controller = new LoadBalanceByMonthController(makeLoadBalanceByMonthValidation(), makeDbLoadBalanceByMonth())
  return makeErrorHandlerControllerDecorator(controller)
}
