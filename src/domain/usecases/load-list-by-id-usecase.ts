import { IList } from '../models/list'

export interface ILoadListById {
  load(id: string): Promise<IList>
}
