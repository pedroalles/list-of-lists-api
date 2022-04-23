import { ILoadListByIdRepository } from '@/data/interfaces/db/load-list-by-id-repository'
import { IList } from '@/domain/models/list'
import { makeFakeList } from '@/presentation/tests/lists-mock'
import { LoadListByIdUseCase } from './load-list-by-id-use-case'

const makeLoadByIdRepositoryStub = (): ILoadListByIdRepository => {
  class LoadListByIdRepositoryStub implements ILoadListByIdRepository {
    async loadById(id: string): Promise<IList> {
      return new Promise((resolve) => resolve(makeFakeList()))
    }
  }
  return new LoadListByIdRepositoryStub()
}

type SutTypes = {
  sut: LoadListByIdUseCase
  loadListByIdRepositoryStub: ILoadListByIdRepository
}

const makeSut = (): SutTypes => {
  const loadListByIdRepositoryStub = makeLoadByIdRepositoryStub()
  const sut = new LoadListByIdUseCase(loadListByIdRepositoryStub)
  return {
    sut,
    loadListByIdRepositoryStub
  }
}

describe('LoadListById UseCase', () => {
  it('should call LoadListByIdRepository loadById method with correct value', async () => {
    const { sut, loadListByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadListByIdRepositoryStub, 'loadById')
    await sut.load('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  it('should return a list on success', async () => {
    const { sut } = makeSut()
    const list = await sut.load(makeFakeList().id)
    expect(list).toEqual(makeFakeList())
  })

  it('should throw if LoadListByIdRepository throws', async () => {
    const { sut, loadListByIdRepositoryStub } = makeSut()
    jest
      .spyOn(loadListByIdRepositoryStub, 'loadById')
      .mockRejectedValue(new Error())
    const promise = sut.load('any_id')
    expect(promise).rejects.toThrow()
  })
})
