import { ILoadListsRepository } from '@/data/interfaces/db/load-lists-repository'
import { IList } from '@/domain/models/list'

export class ListsInMemoryRepository implements ILoadListsRepository {
  protected _lists: IList[] = []

  async loadAll(): Promise<IList[]> {
    return this._lists
  }

  public get lists(): IList[] {
    return this._lists
  }

  public set lists(data: IList[]) {
    this._lists = data
  }
}
