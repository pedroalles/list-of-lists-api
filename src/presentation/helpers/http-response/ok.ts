import { IHttpResponse } from '@/presentation/interfaces/http-response'

export const ok = (data: any): IHttpResponse => ({
  statusCode: 200,
  body: data
})
