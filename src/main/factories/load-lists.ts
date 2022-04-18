import { LoadListsUseCase } from '@/data/usecases/load-lists/load-lists-use-case'
import { ListsInMemoryRepository } from '@/infra/db/in-memory/lists-in-memory-repository'
import { LoadListsController } from '@/presentation/controllers/load-lists/load-lists-controller'
import { makeFakeLists } from '@/presentation/tests/lists-mock'

export const makeLoadListsController = (): LoadListsController => {
  const inMemoryrepository = new ListsInMemoryRepository()

  // adding fake data to inMemoryRepository
  inMemoryrepository.lists.push(...makeFakeLists(), ...makeFakeLists())

  const loadListsUseCase = new LoadListsUseCase(inMemoryrepository)

  const loadListsController = new LoadListsController(loadListsUseCase)

  return loadListsController
}
