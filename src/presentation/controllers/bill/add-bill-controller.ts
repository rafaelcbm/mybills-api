import { AddBill, AddBillParams } from '@/domain/usecases'
import { badRequest, noContent } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import parseISO from 'date-fns/parseISO'

export class AddBillController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addBill: AddBill
  ) {}

  async handle (request: AddBillControllerRequest): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    request.date = parseISO(request.date.toString())
    await this.addBill.add({
      ...request
    })
    return noContent()
  }
}

export type AddBillControllerRequest = AddBillParams
