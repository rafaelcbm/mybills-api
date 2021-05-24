import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeAddBillValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of [
    'walletId',
    'categoryId',
    'description',
    'date',
    'value',
    'isDebt'
  ]) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
