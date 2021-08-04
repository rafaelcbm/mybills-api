import { Validation } from '@/presentation/protocols'
import { MissingParamError } from '@/presentation/errors'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    if (input[this.fieldName] === null || input[this.fieldName] === undefined) {
      return new MissingParamError(this.fieldName)
    }
  }
}
