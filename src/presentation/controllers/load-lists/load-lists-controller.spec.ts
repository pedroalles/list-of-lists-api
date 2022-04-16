import { IList } from '@/domain/models/list'
import { ILoadLists } from '@/domain/usecases/load-lists-usecase'
import { LoadListsController } from './load-lists-controller'

const makeLoadListsUseCaseStub = (): ILoadLists => {
  class LoadListsUseCaseStub implements ILoadLists {
    async load(): Promise<IList[]> {
      return null
    }
  }
  return new LoadListsUseCaseStub()
}

type SutTypes = {
  sut: LoadListsController
  loadListsUseCaseStub: ILoadLists
}

const makeSut = (): SutTypes => {
  const loadListsUseCaseStub = makeLoadListsUseCaseStub()
  const sut = new LoadListsController(loadListsUseCaseStub)
  return {
    sut,
    loadListsUseCaseStub
  }
}

describe('LoadLists Controller', () => {
  it('should call LoadListsUseCase load method', async () => {
    const { sut, loadListsUseCaseStub } = makeSut()
    const loadSpy = jest.spyOn(loadListsUseCaseStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
