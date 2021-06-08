import { LoadBalanceByMonth } from '@/domain/usecases'
import { badRequest, ok } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class LoadBalanceByMonthController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadBalanceByMonth: LoadBalanceByMonth
  ) {}

  async handle (request: LoadBalanceByMonthControllerRequest): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const categories = await this.loadBalanceByMonth.loadBalance(request)
    return ok(categories)
  }
}

export type LoadBalanceByMonthControllerRequest = {
  accountId: string
  yearMonth: string
}
