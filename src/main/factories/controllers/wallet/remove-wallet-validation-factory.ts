import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators'

export const makeRemoveWalletValidation = (): Validation => {
  return new RequiredFieldValidation('walletId')
}
