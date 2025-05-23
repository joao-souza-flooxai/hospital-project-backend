import { profileService } from './profileService.js'
import { adminZodSchema } from '../admin/adminZodSchema.js'
import { userZodSchema } from '../user/userZodSchema.js'

export const profileController = {
  getMe: async (request, reply) => {
      const response = await profileService.getMe(request.user)
      return reply.send(response)
    
  },

  updateMe: async (request, reply) => {
    const { role } = request.user

      const data =
        role === 'admin'
          ? adminZodSchema.update.parse(request.body)
          : userZodSchema.updateUserSchema.parse(request.body)

      const response = await profileService.updateMe(request.user, data)
      return reply.send(response)
  }
}
