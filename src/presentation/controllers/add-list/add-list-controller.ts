import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation
} from '@/presentation/interfaces'

export class AddListController implements IController {
  constructor(private readonly validator: IValidation) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    this.validator.validate(httpRequest.body)
    return null
  }
}
