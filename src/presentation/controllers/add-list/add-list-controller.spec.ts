import { IHttpRequest, IValidation } from '@/presentation/interfaces'
import { AddListController } from './add-list-controller'

class ValidatorStub implements IValidation {
  validate(input: any): Error {
    return null
  }
}

describe('AddList Controller', () => {
  it('should call Validation with correct values', async () => {
    const validatorStub = new ValidatorStub()
    const sut = new AddListController(validatorStub)
    const validateSpy = jest.spyOn(validatorStub, 'validate')

    const httpRequest: IHttpRequest = {
      body: {}
    }

    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
