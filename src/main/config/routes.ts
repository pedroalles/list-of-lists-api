import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

export default function setupRoutes(app: Express): void {
  const router = Router()
  app.use('/api', router)
  readdirSync(join(__dirname, '..', 'routes')).map(async (fileName) => {
    if (fileName.endsWith('routes.ts') || fileName.endsWith('routes.js')) {
      const route = (await import(join('..', 'routes', fileName))).default
      route(router)
    }
  })
}
