import { positionService } from "./postionService.js"

export const positionController = {
  create: async (request, reply) => {
    const adminId = request.user.id
    const hospitalId = request.user.hospital_id

    const positionData = {
      ...request.body,
      hospital_id: hospitalId,
      created_by_admin: adminId
    }

    const position = await positionService.create(positionData)
    return reply.code(201).send(position)
  },

  update: async (request, reply) => {
    const { id } = request.params
    const hospitalId = request.user.hospital_id

    const position = await positionService.update(id, request.body, hospitalId)
    return reply.send(position)
  },

  delete: async (req, reply) => {
    const adminId = req.user.id
    const hospitalId = req.user.hospital_id;
    const { id } = req.params
    const result = await positionService.delete({ id, hospitalId ,adminId })
    return reply.send(result)
  },

  list: async (request, reply) => {
    const hospitalId = request.user.hospital_id
    const { filter, page } = request.query

    const result = await positionService.list({
      hospitalId,
      filter,
      page: Number(page) || 1
    })

    return reply.send(result)
  }
}

