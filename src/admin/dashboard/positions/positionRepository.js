import { prisma } from "../../../prisma/client.js"

export const positionRepository = {
  create: async (data) => {
    return await prisma.position.create({ data })
  },

  update: async (id, data) => {
    return await prisma.position.update({
      where: { id },
      data
    })
  },

  delete: async (id) => {
    return await prisma.position.delete({ where: { id } })
  },

  findById: async (id) => {
    return await prisma.position.findUnique({ where: { id } })
  },

  findAllByHospital: async (hospital_id) => {
    return await prisma.position.findMany({
      where: { hospital_id }
    })
  }
}
