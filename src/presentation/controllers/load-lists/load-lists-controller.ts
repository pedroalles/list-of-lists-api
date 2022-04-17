import { ILoadLists } from '@/domain/usecases/load-lists-usecase'
import { ok, serverError } from '@/presentation/helpers/http-response'
import {
  IController,
  IHttpRequest,
  IHttpResponse
} from '@/presentation/interfaces'

export class LoadListsController implements IController {
  constructor(private readonly loadLists: ILoadLists) {}
  async handle(_httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const lists = await this.loadLists.load()
      return ok(lists)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
