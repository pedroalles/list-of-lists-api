import { makeFakeList, makeFakeLists } from '@/presentation/tests/lists-mock'
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

describe('add ListsInMemory Repository', () => {
  it('should add a list and return the id on success', async () => {
    const sut = new ListsInMemoryRepository()
    const fakeList = { title: 'any_title', description: 'any_description' }
    const listId = await sut.add(fakeList)
    expect(sut.lists).toHaveLength(1)
    expect(typeof listId).toBe('string')
  })
})

describe('loadById ListsInMemory Repository', () => {
  it('should load a list on success', async () => {
    const sut = new ListsInMemoryRepository()
    const fakeList = makeFakeList()
    sut.lists.push(fakeList)
    const list = await sut.loadById('any_id')
    expect(list).toEqual(fakeList)
  })
})
