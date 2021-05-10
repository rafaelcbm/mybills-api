import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeUpdateCategoryValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['categoryId', 'name']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
