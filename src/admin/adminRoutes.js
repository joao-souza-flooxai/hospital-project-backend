import { userController } from "../user/userController.js"
import { authMiddleware } from "../auth/authMiddleware.js"
import { positionController } from "./dashboard/positions/positionController.js"
//Refactor ListAllusers

export default async function adminRoutes(app) {

  app.addHook('onRequest', authMiddleware('admin'))
  app.post("/admin/dashboard/positions", positionController.create)
  app.get("/admin/dashboard/positions", positionController.list)
  app.put("/admin/dashboard/positions/:id", positionController.update)
  app.delete("/admin/dashboard/positions/:id", positionController.delete)
  app.get('/admin/users', (req, reply) => userController.listAll({ reply }))

}
