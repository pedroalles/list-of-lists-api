import { IAddListRepository } from '@/data/interfaces/db/add-list-repository'
import { AddListModel } from '@/domain/usecases/add-list-usecase'
import { AddListUseCase } from './add-list-use-case'

const makeFakeListData = (): AddListModel => {
  return {
    title: 'any_title',
    description: 'any_description'
  }
}

class AddListRepositoryStub implements IAddListRepository {
  add(data: AddListModel): Promise<string> {
    return null
  }
}

describe('AddList UseCase', () => {
  it('should call AddListRepository add method', async () => {
    const addListRepositoryStub = new AddListRepositoryStub()
    const sut = new AddListUseCase(addListRepositoryStub)
    const loadAllSpy = jest.spyOn(addListRepositoryStub, 'add')
    await sut.add(makeFakeListData())
    expect(loadAllSpy).toHaveBeenCalledWith(makeFakeListData())
  })
})
