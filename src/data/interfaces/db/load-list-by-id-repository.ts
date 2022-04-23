import { IList } from '@/domain/models/list'

export interface ILoadListByIdRepository {
  loadById(id: string): Promise<IList>
}
