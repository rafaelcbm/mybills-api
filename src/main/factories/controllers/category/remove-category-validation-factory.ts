import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators'

export const makeRemoveCategoryValidation = (): Validation => {
  return new RequiredFieldValidation('categoryId')
}
