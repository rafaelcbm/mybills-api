import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeLoadBillsByMonthValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['yearMonth']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
