import { IList } from '@/domain/models/list'

export interface ILoadListsRepository {
  loadAll(): Promise<IList[]>
}
