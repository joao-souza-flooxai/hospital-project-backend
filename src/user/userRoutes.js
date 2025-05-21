import { userController } from "./userController.js"

export default async function userRoutes(app) {
  app.post('/users', (req, reply) => userController.create({ req, reply }))

  app.get('/users', (req, reply) => userController.listAll({ reply }))

  app.get('/users/:id', (req, reply) => userController.getById({ req, reply }))

  app.put('/users/:id', (req, reply) => userController.update({ req, reply }))

  app.delete('/users/:id', (req, reply) => userController.delete({ req, reply }))
}
