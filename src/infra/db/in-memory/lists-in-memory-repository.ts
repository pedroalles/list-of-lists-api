import { ILoadListsRepository } from '@/data/interfaces/db/load-lists-repository'
import { IList } from '@/domain/models/list'

export class ListsInMemoryRepository implements ILoadListsRepository {
  public lists: IList[] = []

  async loadAll(): Promise<IList[]> {
    return this.lists
  }
}
