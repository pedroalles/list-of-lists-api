import { AddListModel, IAddList } from '@/domain/usecases/add-list-usecase'
import { badRequest } from '@/presentation/helpers/http-response'
import { IHttpRequest, IValidation } from '@/presentation/interfaces'
import { AddListController } from './add-list-controller'

const makeFakeRequest = (): IHttpRequest => {
  return {
    body: {
      title: 'any_title',
      description: 'any_description'
    }
  }
}

const makeValidatorStub = (): IValidation => {
  class ValidatorStub implements IValidation {
    validate(input: any): Error {
      return null
    }
  }
  return new ValidatorStub()
}

const makeAddListStub = (): IAddList => {
  class AddListStub implements IAddList {
    add(data: AddListModel): Promise<string> {
      return null
    }
  }
  return new AddListStub()
}

type SutTypes = {
  sut: AddListController
  validatorStub: IValidation
  addListStub: IAddList
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidatorStub()
  const addListStub = makeAddListStub()
  const sut = new AddListController(validatorStub, addListStub)
  return {
    sut,
    validatorStub,
    addListStub
  }
}

describe('AddList Controller', () => {
  it('should call Validation with correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('should return 400 if Validator returns an error', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest.body)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  it('should call AddListUseCase with correct values', async () => {
    const { sut, addListStub } = makeSut()
    const addSpy = jest.spyOn(addListStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
