import { IList } from '@/domain/models/list'
import { ILoadListById } from '@/domain/usecases/load-list-by-id-usecase'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helpers/http-response/forbidden'
import { IHttpRequest } from '@/presentation/interfaces'
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
      return null
    }
  }
  return new LoadListByIdStub()
}

type SutTypes = {
  sut: AddListItemController
  loadListByIdStub: ILoadListById
}

const makeSut = (): SutTypes => {
  const loadListByIdStub = makeLoadListByIdStub()
  const sut = new AddListItemController(loadListByIdStub)
  return {
    sut,
    loadListByIdStub
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
})
