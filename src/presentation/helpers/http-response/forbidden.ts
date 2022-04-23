import { IHttpResponse } from '@/presentation/interfaces'

export const forbidden = (error: Error): IHttpResponse => ({
  statusCode: 403,
  body: error
})
