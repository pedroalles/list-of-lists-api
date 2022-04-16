import { IListItem } from './list-item'

export type IList = {
  id: string
  title: string
  description?: string
  items: (IList | IListItem)[]
  createdAt: Date
  updatedAt: Date
}
