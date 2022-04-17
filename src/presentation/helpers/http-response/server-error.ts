import { ServerError } from '@/presentation/errors/server-error'
import { IHttpResponse } from '@/presentation/interfaces/http-response'

export const serverError = (error: Error): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
