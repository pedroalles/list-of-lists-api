import { ILoadLists } from '@/domain/usecases/load-lists-usecase'
import { serverError } from '@/presentation/helpers/http-response/server-error'

export class LoadListsController {
  constructor(private readonly loadLists: ILoadLists) {}

  async handle(_httpRequest: any): Promise<any> {
    try {
      const lists = await this.loadLists.load()
      return {
        statusCode: 200,
        body: lists
      }
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
