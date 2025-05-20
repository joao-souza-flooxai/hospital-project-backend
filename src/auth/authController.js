import { authService } from "./authService.js";
import { loginSchema } from "./authZodSchema.js";

export const authController = async (req, reply) => {
  try {
    const data = loginSchema.parse(req.body)
    const result = await authService.login(data)
    return reply.send({ success: true, admin: result })
  } catch (err) {
    return reply.status(401).send({ error: err.message })
  }
}
