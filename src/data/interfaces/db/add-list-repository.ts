import { AddListModel } from '@/domain/usecases/add-list-usecase'

export interface IAddListRepository {
  add(data: AddListModel): Promise<string>
}
