import { IController, IHttpRequest } from '@/presentation/interfaces'
import { Request, Response } from 'express'

export default function routeAdapter(controller: IController) {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body
    }

    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
