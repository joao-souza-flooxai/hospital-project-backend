import { prisma } from "../prisma/client.js"

export const positionService = {

 listPublic: async ({ search = '', page = 1, pageSize = 10 }) => {
  const skip = (page - 1) * pageSize

  const where = {
    status: 'ACTIVE',
    spots: {
      gt: 0 
    },
    title: {
      contains: search,
      mode: 'insensitive'
    }
  }

  const [positions, total] = await Promise.all([
    prisma.position.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: {
        created_at: 'desc'
      },
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        created_at: true,
        spots: true,
        hospital: {
          select: {
            name: true
          }
        }
      }
    }),
    prisma.position.count({ where })
  ])

  return {
    positions,
    total,
    page,
    totalPages: Math.ceil(total / pageSize)
  }
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
  }, 
 
  findById: (id) => prisma.position.findUnique({ where: { id } }),

}
