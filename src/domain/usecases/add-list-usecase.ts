export type AddListModel = {
  title: string
  description: string
}

export interface IAddList {
  add(list: AddListModel): Promise<string>
}
