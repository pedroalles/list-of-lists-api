import { Router, Request, Response } from 'express'

export default (router: Router): void => {
  router.get('/lists', (req: Request, res: Response) => {
    res.status(200).json({ msg: 'ok' })
  })
}
