import { IList } from '@/domain/models/list'
import { ILoadLists } from '@/domain/usecases/load-lists-usecase'
import { LoadListsController } from './load-lists-controller'
import MockDate from 'mockdate'
import { makeFakeLists } from '@/presentation/tests/lists-mock'

const makeLoadListsUseCaseStub = (): ILoadLists => {
  class LoadListsUseCaseStub implements ILoadLists {
    async load(): Promise<IList[]> {
      return new Promise((resolve) => resolve(makeFakeLists()))
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
  afterAll(() => {
    MockDate.set(new Date())
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  it('should call LoadListsUseCase load method', async () => {
    const { sut, loadListsUseCaseStub } = makeSut()
    const loadSpy = jest.spyOn(loadListsUseCaseStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  it('should return 200 on success', async () => {
    const { sut } = makeSut()
    const lists = await sut.handle({})
    expect(lists.statusCode).toBe(200)
  })

  it('should return data on success', async () => {
    const { sut } = makeSut()
    const lists = await sut.handle({})
    expect(lists.body).toEqual(makeFakeLists())
  })
})