import { RequiredFieldValidation } from '@/validations/validators/required-field-validation'
import { ValidationComposite } from '@/validations/validators/validation-composite'

export const makeAddListValidation = (): ValidationComposite => {
  const composite = new ValidationComposite([
    new RequiredFieldValidation('title')
  ])
  return composite
}
