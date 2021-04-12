import { Controller, HttpResponse } from '@/presentation/protocols'
import { LogErrorRepository } from '@/data/protocols/db'
import { GenericBusinessError } from '@/domain/errors'
import { badRequest, serverError } from '@/presentation/helpers'

export class ErrorHandlerControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      return await this.controller.handle(request)
    } catch (error) {
      if (error instanceof GenericBusinessError) {
        return badRequest(error)
      } else {
        await this.logErrorRepository.logError(error.stack)
        return serverError(error)
      }
    }
  }
}
