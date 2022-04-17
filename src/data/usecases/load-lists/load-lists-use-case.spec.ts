import { ILoadListsRepository } from '@/data/interfaces/db/load-lists-repository'
import { IList } from '@/domain/models/list'
import { LoadListsUseCase } from './load-lists-use-case'

class LoadListsRepositoryStub implements ILoadListsRepository {
  loadAll(): Promise<IList[]> {
    return null
  }
}

describe('LoadLists UseCase', () => {
  it('should call LoadListsRepository loadAll method', async () => {
    const loadListsRepositoryStub = new LoadListsRepositoryStub()
    const sut = new LoadListsUseCase(loadListsRepositoryStub)
    const loadAllSpy = jest.spyOn(loadListsRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
