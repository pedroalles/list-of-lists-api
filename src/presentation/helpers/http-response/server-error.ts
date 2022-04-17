import { ServerError } from '@/presentation/errors/server-error'

export const serverError = (error: Error): any => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
