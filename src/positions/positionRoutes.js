import { positionController } from './positionController.js'
import { authMiddleware } from '../auth/authMiddleware.js'

export default async function publicPositionRoutes(app) {

  app.get('/positions', positionController.listPublic)

  app.get('/user/positions', { preHandler: authMiddleware('user') }, positionController.listByUser)
}