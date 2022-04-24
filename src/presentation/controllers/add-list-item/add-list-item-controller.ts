import { IAddListItem } from '@/domain/usecases/add-list-item-usecase'
import { ILoadListById } from '@/domain/usecases/load-list-by-id-usecase'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { badRequest, forbidden } from '@/presentation/helpers/http-response'
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation
} from '@/presentation/interfaces'

export class AddListItemController implements IController {
  constructor(
    private readonly loadListById: ILoadListById,
    private readonly addListItem: IAddListItem,
    private readonly validator: IValidation
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const list = await this.loadListById.load(httpRequest.params.id)
    if (!list) return forbidden(new InvalidParamError('ListId'))
    const error = this.validator.validate(httpRequest.body)
    if (error) return badRequest(error)
    await this.addListItem.add(httpRequest.body)
  }
}
