import { profileController } from './profileController.js'
import { authMiddleware } from '../auth/authMiddleware.js'

export default async function profileRoutes(app) {
  app.addHook('onRequest', authMiddleware())

  app.get('/me', profileController.getMe)
  app.put('/me', profileController.updateMe)
}
