export type AddListItemModel = {
  title: string
  description: string
}

export interface IAddListItem {
  add(item: AddListItemModel): Promise<string>
}
