import { userController } from "../user/userController.js"
import { authMiddleware } from "../auth/authMiddleware.js"
import { positionController } from "./positions/positionController.js"
//Refactor ListAllusers

export default async function adminRoutes(app) {

  app.addHook('onRequest', authMiddleware('admin'))
  app.post("/admin/positions", positionController.create)
  app.get("/admin/positions", positionController.list)
  app.put("/admin/positions/:id", positionController.update)
  app.delete("/admin/positions/:id", positionController.delete)
  app.get('/admin/users', (req, reply) => userController.listAll({ reply }))

}
