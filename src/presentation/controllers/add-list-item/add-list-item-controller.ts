import { ILoadListById } from '@/domain/usecases/load-list-by-id-usecase'
import {
  IController,
  IHttpRequest,
  IHttpResponse
} from '@/presentation/interfaces'

export class AddListItemController implements IController {
  constructor(private readonly loadListById: ILoadListById) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    await this.loadListById.load(httpRequest.params.id)
    return null
  }
}
