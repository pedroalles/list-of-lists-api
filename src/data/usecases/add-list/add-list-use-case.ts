import { IAddListRepository } from '@/data/interfaces/db/add-list-repository'
import { AddListModel, IAddList } from '@/domain/usecases/add-list-usecase'

export class AddListUseCase implements IAddList {
  constructor(public readonly addListRepository: IAddListRepository) {}
  async add(list: AddListModel): Promise<string> {
    await this.addListRepository.add(list)
    return null
  }
}
