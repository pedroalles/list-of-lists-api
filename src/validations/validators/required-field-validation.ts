import { MissingFieldError } from '@/presentation/errors'
import { IValidation } from '@/presentation/interfaces'

export class RequiredFieldValidation implements IValidation {
  constructor(private readonly fieldName: string) {}
  validate(input: any): Error {
    if (!input[this.fieldName]) return new MissingFieldError(this.fieldName)
  }
}
