import { ILoadListById } from '@/domain/usecases/load-list-by-id-usecase'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { forbidden } from '@/presentation/helpers/http-response'
import {
  IController,
  IHttpRequest,
  IHttpResponse
} from '@/presentation/interfaces'

export class AddListItemController implements IController {
  constructor(private readonly loadListById: ILoadListById) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const list = await this.loadListById.load(httpRequest.params.id)
    if (!list) return forbidden(new InvalidParamError('ListId'))
  }
}
