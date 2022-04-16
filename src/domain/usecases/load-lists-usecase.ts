import { IList } from '../models/list'

export interface ILoadLists {
  load(): Promise<IList[]>
}
