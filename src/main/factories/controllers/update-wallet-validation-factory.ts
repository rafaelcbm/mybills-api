import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeUpdateWalletValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['walletId', 'name']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
