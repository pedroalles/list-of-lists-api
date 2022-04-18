import { IHttpResponse } from '@/presentation/interfaces'

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error
})
