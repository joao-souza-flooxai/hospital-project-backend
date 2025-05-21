import { prisma } from "../prisma/client.js"

export const positionService = {

  listPublic: async () => {
    return await prisma.position.findMany({
      where: {
        status: 'ACTIVE'
      },
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        created_at: true,
        hospital: {
          select: {
            name: true
          }
        }
      }
    })
  },

  listByUser: async (userId) => {
    return await prisma.position.findMany({
      where: {
        Application: {
          some: {
            user_id: userId
          }
        }
      },
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        status: true,
        created_at: true,
        hospital: {
          select: {
            name: true
          }
        }
      }
    })
  }
}
