import { ILoadListsRepository } from '@/data/interfaces/db/load-lists-repository'
import { IList } from '@/domain/models/list'
import { LoadListsUseCase } from './load-lists-use-case'

const makeLoadListsRepositoryStub = (): ILoadListsRepository => {
  class LoadListsRepositoryStub implements ILoadListsRepository {
    loadAll(): Promise<IList[]> {
      return null
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
  it('should call LoadListsRepository loadAll method', async () => {
    const { sut, loadListsRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadListsRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
