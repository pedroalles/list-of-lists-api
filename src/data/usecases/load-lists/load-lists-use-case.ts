import { ILoadListsRepository } from '@/data/interfaces/db/load-lists-repository'
import { IList } from '@/domain/models/list'
import { ILoadLists } from '@/domain/usecases/load-lists-usecase'

export class LoadListsUseCase implements ILoadLists {
  constructor(private readonly loadListsRepository: ILoadListsRepository) {}

  async load(): Promise<IList[]> {
    return this.loadListsRepository.loadAll()
  }
}
