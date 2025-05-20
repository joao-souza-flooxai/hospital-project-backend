import { authController } from './authController.js'

export default async function authRoutes(app) {
  app.post('/login', authController)
}