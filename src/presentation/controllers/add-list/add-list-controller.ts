import { badRequest } from '@/presentation/helpers/http-response'
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation
} from '@/presentation/interfaces'

export class AddListController implements IController {
  constructor(private readonly validator: IValidation) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = this.validator.validate(httpRequest.body)
    if (error) return badRequest(error)
  }
}
