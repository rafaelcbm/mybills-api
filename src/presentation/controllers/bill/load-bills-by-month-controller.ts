import { LoadBillsByMonth } from '@/domain/usecases'
import { badRequest, ok } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class LoadBillsByMonthController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadBillsByMonth: LoadBillsByMonth
  ) {}

  async handle (request: LoadBillsByMonthControllerRequest): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const categories = await this.loadBillsByMonth.loadBills(request)
    return ok(categories)
  }
}

export type LoadBillsByMonthControllerRequest = {
  accountId: string
  yearMonth: string
}
