import { IList } from '@/domain/models/list'
import { ILoadLists } from '@/domain/usecases/load-lists-usecase'
import { LoadListsController } from './load-lists-controller'
import { makeFakeLists } from '@/presentation/tests/lists-mock'
import {
  serverError,
  ok,
  noContent
} from '@/presentation/helpers/http-response'
import MockDate from 'mockdate'

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
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeLists()))
  })

  it('should return 204 if LoadListsUseCase load method returns empty', async () => {
    const { sut, loadListsUseCaseStub } = makeSut()
    jest.spyOn(loadListsUseCaseStub, 'load').mockResolvedValueOnce([])
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  it('should return 500 if LoadListsUseCase load method throws', async () => {
    const { sut, loadListsUseCaseStub } = makeSut()
    jest.spyOn(loadListsUseCaseStub, 'load').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
