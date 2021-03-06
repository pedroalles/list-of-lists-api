import { IList } from '@/domain/models/list'
import {
  AddListItemModel,
  IAddListItem
} from '@/domain/usecases/add-list-item-usecase'
import { ILoadListById } from '@/domain/usecases/load-list-by-id-usecase'
import { InvalidParamError } from '@/presentation/errors'
import {
  badRequest,
  ok,
  serverError
} from '@/presentation/helpers/http-response'
import { forbidden } from '@/presentation/helpers/http-response/forbidden'
import { IHttpRequest, IValidation } from '@/presentation/interfaces'
import { makeFakeList } from '@/presentation/tests/lists-mock'
import { AddListItemController } from './add-list-item-controller'

const makeFakeRequest = (): IHttpRequest => {
  return {
    body: {
      title: 'any_title',
      description: 'any_description'
    },
    params: {
      id: 'any_id'
    }
  }
}

const makeLoadListByIdStub = (): ILoadListById => {
  class LoadListByIdStub implements ILoadListById {
    async load(id: string): Promise<IList> {
      return new Promise((resolve) => resolve(makeFakeList()))
    }
  }
  return new LoadListByIdStub()
}

const makeAddListItemStub = (): IAddListItem => {
  class AddListItemStub implements IAddListItem {
    async add(item: AddListItemModel): Promise<string> {
      return new Promise((resolve) => resolve('any_id'))
    }
  }
  return new AddListItemStub()
}

const makeValidatorStub = (): IValidation => {
  class ValidatorStub implements IValidation {
    validate(input: any): Error {
      return null
    }
  }
  return new ValidatorStub()
}

type SutTypes = {
  sut: AddListItemController
  loadListByIdStub: ILoadListById
  addListItemStub: IAddListItem
  validatorStub: IValidation
}

const makeSut = (): SutTypes => {
  const loadListByIdStub = makeLoadListByIdStub()
  const addListItemStub = makeAddListItemStub()
  const validatorStub = makeValidatorStub()

  const sut = new AddListItemController(
    loadListByIdStub,
    addListItemStub,
    validatorStub
  )
  return {
    sut,
    loadListByIdStub,
    addListItemStub,
    validatorStub
  }
}

describe('AddListItem Controller', () => {
  it('should call LoadListById with correct value', async () => {
    const { sut, loadListByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadListByIdStub, 'load')

    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(loadSpy).toHaveBeenCalledWith(httpRequest.params.id)
  })

  it('should return 403 if LoadListById returns null', async () => {
    const { sut, loadListByIdStub } = makeSut()
    jest.spyOn(loadListByIdStub, 'load').mockResolvedValueOnce(null)
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('ListId')))
  })

  it('should call AddListItem with correct value', async () => {
    const { sut, addListItemStub } = makeSut()
    const addSpy = jest.spyOn(addListItemStub, 'add')

    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

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
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  it('should return 500 if AddListItemUseCase add method throws', async () => {
    const { sut, addListItemStub } = makeSut()
    jest.spyOn(addListItemStub, 'add').mockRejectedValueOnce(new Error())
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok('any_id'))
  })
})
