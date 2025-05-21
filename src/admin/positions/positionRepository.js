import { prisma } from "../../prisma/client.js"

export const positionRepository = {
  create: async (data) => {
    return await prisma.positions.create({ data })
  },

  update: async (id, data) => {
    return await prisma.positions.update({
      where: { id },
      data
    })
  },

  delete: async (id) => {
    return await prisma.positions.delete({ where: { id } })
  },

  findById: async (id) => {
    return await prisma.positions.findUnique({ where: { id } })
  },

  findAllByHospital: async (hospital_id) => {
    return await prisma.positions.findMany({
      where: { hospital_id }
    })
  }
}
