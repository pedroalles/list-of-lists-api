import { Router } from 'express'
import routeAdapter from '../adapters/express-route-adapter'
import { makeLoadListsController } from '../factories/load-lists'

export default (router: Router): void => {
  router.get('/lists', routeAdapter(makeLoadListsController()))
}
