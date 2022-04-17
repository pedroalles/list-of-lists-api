import { makeFakeLists } from '@/presentation/tests/lists-mock'
import { ListsInMemoryRepository } from './lists-in-memory-repository'

describe('loadAll ListsInMemory Repository', () => {
  it('should load all lists on success', async () => {
    const sut = new ListsInMemoryRepository()
    const fakeLists = makeFakeLists()
    sut.lists.push(...fakeLists)
    const lists = await sut.loadAll()
    expect(lists).toEqual(fakeLists)
  })

  it('should load an empty array', async () => {
    const sut = new ListsInMemoryRepository()
    const lists = await sut.loadAll()
    expect(lists).toEqual([])
  })
})
