import { IList } from '@/domain/models/list'
import { ILoadListById } from '@/domain/usecases/load-list-by-id-usecase'
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

class LoadListByIdStub implements ILoadListById {
  async load(id: string): Promise<IList> {
    return null
  }
}

describe('AddListItem Controller', () => {
  it('should call LoadListById with correct value', async () => {
    const loadListByIdStub = new LoadListByIdStub()
    const sut = new AddListItemController(loadListByIdStub)
    const loadSpy = jest.spyOn(loadListByIdStub, 'load')

    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(loadSpy).toHaveBeenCalledWith(httpRequest.params.id)
  })
})
