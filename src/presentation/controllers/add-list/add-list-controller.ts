import { IAddList } from '@/domain/usecases/add-list-usecase'
import {
  badRequest,
  serverError,
  ok
} from '@/presentation/helpers/http-response'
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation
} from '@/presentation/interfaces'

export class AddListController implements IController {
  constructor(
    private readonly validator: IValidation,
    private readonly addList: IAddList
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) return badRequest(error)
      const listId = await this.addList.add(httpRequest.body)
      return ok(listId)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
