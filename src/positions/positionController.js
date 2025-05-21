import { positionService } from './positionService.js'

export const positionController = {
  listPublic: async (req, reply) => {
    const positions = await positionService.listPublic()
    return reply.send({ success: true, positions })
  },


  listByUser: async (req, reply) => {
    const userId = req.user.id
    const positions = await positionService.listByUser(userId)
    return reply.send({ success: true, positions })
  }
}
