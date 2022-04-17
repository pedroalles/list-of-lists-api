import { ILoadLists } from '@/domain/usecases/load-lists-usecase'
import { ok } from '@/presentation/helpers/http-response/ok'
import { serverError } from '@/presentation/helpers/http-response/server-error'
import { IController } from '@/presentation/interfaces/controller'
import { IHttpRequest } from '@/presentation/interfaces/http-request'
import { IHttpResponse } from '@/presentation/interfaces/http-response'

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
