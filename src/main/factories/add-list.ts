import { AddListUseCase } from '@/data/usecases/add-list/add-list-use-case'
import { ListsInMemoryRepository } from '@/infra/db/in-memory/lists-in-memory-repository'
import { AddListController } from '@/presentation/controllers/add-list/add-list-controller'
import { makeAddListValidation } from './add-list-validation'

export const makeAddListController = (): AddListController => {
  const inMemoryrepository = new ListsInMemoryRepository()

  const addListUseCase = new AddListUseCase(inMemoryrepository)

  const validationComposite = makeAddListValidation()

  const loadListsController = new AddListController(
    validationComposite,
    addListUseCase
  )

  return loadListsController
}
