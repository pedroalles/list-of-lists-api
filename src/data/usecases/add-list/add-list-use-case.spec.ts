import { IAddListRepository } from '@/data/interfaces/db/add-list-repository'
import { AddListModel } from '@/domain/usecases/add-list-usecase'
import { AddListUseCase } from './add-list-use-case'

const makeFakeListData = (): AddListModel => {
  return {
    title: 'any_title',
    description: 'any_description'
  }
}

const makeAddListRepositoryStub = (): IAddListRepository => {
  class AddListRepositoryStub implements IAddListRepository {
    add(data: AddListModel): Promise<string> {
      return null
    }
  }
  return new AddListRepositoryStub()
}

type SutTypes = {
  sut: AddListUseCase
  addListRepositoryStub: IAddListRepository
}

const makeSut = (): SutTypes => {
  const addListRepositoryStub = makeAddListRepositoryStub()
  const sut = new AddListUseCase(addListRepositoryStub)
  return {
    sut,
    addListRepositoryStub
  }
}

describe('AddList UseCase', () => {
  it('should call AddListRepository add method', async () => {
    const { sut, addListRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(addListRepositoryStub, 'add')
    await sut.add(makeFakeListData())
    expect(loadAllSpy).toHaveBeenCalledWith(makeFakeListData())
  })

  it('should throw if AddListRepository throws', async () => {
    const { sut, addListRepositoryStub } = makeSut()
    jest.spyOn(addListRepositoryStub, 'add').mockRejectedValue(new Error())
    const promise = sut.add(makeFakeListData())
    expect(promise).rejects.toThrow()
  })
})
