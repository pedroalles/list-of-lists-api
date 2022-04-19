import { RequiredFieldValidation } from '@/validations/validators/required-field-validation'
import { ValidationComposite } from '@/validations/validators/validation-composite'
import { makeAddListValidation } from './add-list-validation'

jest.mock('@/validations/validators/validation-composite')

describe('AddListValidation Factory', () => {
  it('should call ValidationComposite with all validators', () => {
    makeAddListValidation()
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation('title')
    ])
  })
})
