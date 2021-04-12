import { GenericBusinessError } from '@/domain/errors'

export const throwError = (): never => {
  throw new Error()
}

export const throwBadRequestError = (errorMsg: string): never => {
  throw new GenericBusinessError(errorMsg)
}
