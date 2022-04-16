import { ILoadLists } from '@/domain/usecases/load-lists-usecase'

export class LoadListsController {
  constructor(private readonly loadLists: ILoadLists) {}

  async handle(_httpRequest: any): Promise<any> {
    const lists = await this.loadLists.load()
    return {
      statusCode: 200,
      body: lists
    }
  }
}
