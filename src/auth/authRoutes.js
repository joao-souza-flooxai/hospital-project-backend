import { authController } from './authController.js'

export default async function authRoutes(app) {
  app.post('/login', authController.login)
  app.post('/login/admin', authController.login)
  app.post('/register', authController.register)
}