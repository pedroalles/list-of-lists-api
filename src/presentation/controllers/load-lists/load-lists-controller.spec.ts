import { IList } from '@/domain/models/list'
import { ILoadLists } from '@/domain/usecases/load-lists-usecase'
import { LoadListsController } from './load-lists-controller'

class LoadListsUseCaseStub implements ILoadLists {
  async load(): Promise<IList[]> {
    return null
  }
}

describe('LoadLists Controller', () => {
  it('should call LoadListsUseCase load method', async () => {
    const loadListsUseCaseStub = new LoadListsUseCaseStub()
    const loadSpy = jest.spyOn(loadListsUseCaseStub, 'load')
    const sut = new LoadListsController(loadListsUseCaseStub)
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
