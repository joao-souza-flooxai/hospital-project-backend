import { positionService } from './positionService.js'

export const positionController = {
  
  listPublic: async (req, reply) => {
    const { search = '', page = 1, pageSize = 10 } = req.query

    const result = await positionService.listPublic({
      search,
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
