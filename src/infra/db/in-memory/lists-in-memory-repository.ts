import { IAddListRepository } from '@/data/interfaces/db/add-list-repository'
import { ILoadListsRepository } from '@/data/interfaces/db/load-lists-repository'
import { IList } from '@/domain/models/list'
import { AddListModel } from '@/domain/usecases/add-list-usecase'
import { randomUUID } from 'crypto'

export class ListsInMemoryRepository
  implements ILoadListsRepository, IAddListRepository
{
  public lists: IList[] = []

  async add(data: AddListModel): Promise<string> {
    const id = randomUUID()

    this.lists.push({
      id,
      title: data.title,
      description: data.description,
      items: [],
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return id
  }

  async loadAll(): Promise<IList[]> {
    return this.lists
  }
}
