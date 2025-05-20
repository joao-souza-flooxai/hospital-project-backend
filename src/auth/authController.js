import { authService } from "./authService.js";
import { authZodSchemas } from "./authZodSchema.js";

export const authController =  {
 
  login: async(req, reply)=>{

        const data = authZodSchemas.loginSchema.parse(req.body)

        const isAdminRoute = req.routerPath.includes('/admin')

        const result = await authService.login(data, isAdminRoute)
        return reply.send({ success: true, user: result })

  },

}
