import { ILoadLists } from '@/domain/usecases/load-lists-usecase'
import { ok } from '@/presentation/helpers/http-response/ok'
import { serverError } from '@/presentation/helpers/http-response/server-error'

export class LoadListsController {
  constructor(private readonly loadLists: ILoadLists) {}

  async handle(_httpRequest: any): Promise<any> {
    try {
      const lists = await this.loadLists.load()
      return ok(lists)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
