import { IList } from '@/domain/models/list'

export const makeFakeList = (): IList => ({
  id: 'any_id',
  title: 'any_title',
  description: 'any_description',
  items: [],
  createdAt: new Date(),
  updatedAt: new Date()
})

export const makeFakeLists = (): IList[] => {
  return [makeFakeList()]
}
