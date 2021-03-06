import { ILoadListsRepository } from '@/data/interfaces/db/load-lists-repository'
import { IList } from '@/domain/models/list'
import { makeFakeLists } from '@/presentation/tests/lists-mock'
import { LoadListsUseCase } from './load-lists-use-case'
import MockDate from 'mockdate'

const makeLoadListsRepositoryStub = (): ILoadListsRepository => {
  class LoadListsRepositoryStub implements ILoadListsRepository {
    loadAll(): Promise<IList[]> {
      return new Promise((resolve) => resolve(makeFakeLists()))
    }
  }
  return new LoadListsRepositoryStub()
}

type SutTypes = {
  sut: LoadListsUseCase
  loadListsRepositoryStub: ILoadListsRepository
}

const makeSut = (): SutTypes => {
  const loadListsRepositoryStub = makeLoadListsRepositoryStub()
  const sut = new LoadListsUseCase(loadListsRepositoryStub)
  return {
    sut,
    loadListsRepositoryStub
  }
}

describe('LoadLists UseCase', () => {
  afterAll(() => {
    MockDate.set(new Date())
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  it('should call LoadListsRepository loadAll method', async () => {
    const { sut, loadListsRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadListsRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  it('should return an array of lists on success', async () => {
    const { sut } = makeSut()
    const lists = await sut.load()
    expect(lists).toEqual(makeFakeLists())
  })

  it('should throw if LoadListsRepository throws', async () => {
    const { sut, loadListsRepositoryStub } = makeSut()
    jest
      .spyOn(loadListsRepositoryStub, 'loadAll')
      .mockRejectedValue(new Error())
    const promise = sut.load()
    expect(promise).rejects.toThrow()
  })
})
