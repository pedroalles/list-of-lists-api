import { IHttpResponse } from '@/presentation/interfaces'

export const noContent = (): IHttpResponse => ({
  statusCode: 204,
  body: null
})
