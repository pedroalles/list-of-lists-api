import { ILoadListByIdRepository } from '@/data/interfaces/db/load-list-by-id-repository'
import { IList } from '@/domain/models/list'
import { LoadListByIdUseCase } from './load-list-by-id-use-case'

class LoadListByIdRepositoryStub implements ILoadListByIdRepository {
  async loadById(id: string): Promise<IList> {
    return null
  }
}

describe('LoadListById UseCase', () => {
  it('should call LoadListByIdRepository loadById method with correct value', async () => {
    const loadListByIdRepositoryStub = new LoadListByIdRepositoryStub()
    const sut = new LoadListByIdUseCase(loadListByIdRepositoryStub)
    const loadByIdSpy = jest.spyOn(loadListByIdRepositoryStub, 'loadById')
    await sut.load('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })
})
