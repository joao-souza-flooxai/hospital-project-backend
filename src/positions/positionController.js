import { positionService } from './positionService.js'

export const positionController = {
  
  listPublic: async (request, reply) => {
    const { filter = '', page = 1, pageSize = 10, } = request.query
    console.log("filter:", filter);
    const result = await positionService.listPublic({
      filter,
      page: Number(page),
      pageSize: Number(pageSize)
    })

    return reply.send({ success: true, ...result })
  },

  listByUser: async (req, reply) => {
    const userId = req.user.id
    const positions = await positionService.listByUser(userId)
    return reply.send({ success: true, positions })
  }
}
