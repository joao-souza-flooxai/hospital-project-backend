import { userController } from "../user/userController.js"
import { authMiddleware } from "../auth/authMiddleware.js"
import { positionController } from "./dashboard/positions/positionController.js"
import { applicationController } from "./dashboard/applications/applicationController.js"
//Refactor ListAllusers

export default async function adminRoutes(app) {

  app.addHook('onRequest', authMiddleware('admin'))
  app.post("/admin/dashboard/positions", positionController.create)
  app.get("/admin/dashboard/positions", positionController.list)
  app.put("/admin/dashboard/positions/:id", positionController.update)
  app.delete("/admin/dashboard/positions/:id", positionController.delete)
  app.get('/admin/users', (req, reply) => userController.listAll({ reply }))
  app.get('/admin/dashboard/applications', (req, reply) => 
    applicationController.listAll({ req, reply })
  )
  app.patch('/admin/dashboard/applications/:id', (req, reply) =>
    applicationController.updateStatus({ req, reply })
  )
}
