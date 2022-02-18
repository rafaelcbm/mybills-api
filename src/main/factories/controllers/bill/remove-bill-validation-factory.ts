import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeRemoveBillValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['billId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
