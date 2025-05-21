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

  delete: async (request, reply) => {
    const { id } = request.params
    const hospitalId = request.user.hospital_id

    await positionService.delete(id, hospitalId)
    return reply.code(204).send()
  },

  list: async (request, reply) => {
    const hospitalId = request.user.hospital_id
    const positions = await positionService.list(hospitalId)
    return reply.send(positions)
  }
}
