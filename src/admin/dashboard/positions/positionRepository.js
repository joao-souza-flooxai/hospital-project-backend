import { prisma } from "../../../prisma/client.js"

export const positionRepository = {
  create: async (data) => {
    return await prisma.position.create({
      data,
      include: {
        hospital: true,
        admin: true
      }
    })
  },

  update: async (id, data) => {
    return await prisma.position.update({
      where: { id },
      data,
      include: {
        hospital: true,
        admin: true
      }
    })
  },

  delete: async (id) => {
    return await prisma.position.delete({ where: { id } })
  },

  findById: async (id) => {
    return await prisma.position.findUnique({ where: { id } })
  },

  findByIdWithApplications: async (id) => {
    return await prisma.position.findUnique({
      where: { id },
      include: { Application: true },
    })
  },

  findByIdAndHospital: async (id, hospitalId) => {
  return await prisma.position.findFirst({
    where: {
      id,
      hospital_id: hospitalId
    },
    include: {
      admin: {
        select: { id: true, name: true, email: true },
      },
      hospital: {
        select: { id: true, name: true },
      },
    }
  })
},

  findManyByHospital: async ({ hospitalId, filter, skip, take }) => {
    return await prisma.position.findMany({
      where: {
        hospital_id: hospitalId,
        title: {
          contains: filter || '',
          mode: 'insensitive',
        },
      },
      include: {
        admin: {
          select: { id: true, name: true, email: true },
        },
        hospital: {
          select: { id: true, name: true },
        },
      },
      orderBy: { created_at: 'desc' },
      skip,
      take,
    })
  },

  countByHospital: async ({ hospitalId, filter }) => {
    return await prisma.position.count({
      where: {
        hospital_id: hospitalId,
        title: {
          contains: filter || '',
          mode: 'insensitive',
        },
      },
    })
  },

  

  // // Delete com arquivamento (Transaction) 
  // deleteAndArchive: async ({ position, adminId }) => {
  //   return await prisma.$transaction(async (tx) => {
  //     // Cria a posição arquivada
  //     const archivedPosition = await tx.position.create({
  //       data: {
  //         title: `${position.title} (Closed)`,
  //         description: position.description,
  //         status: "CLOSED",
  //         type: position.type,
  //         spots: position.spots,
  //         score: position.score,
  //         hospital_id: position.hospital_id,
  //         created_by_admin: adminId,
  //       },
  //     })

  //     // Atualiza applications para CLOSED e vincula ao archivedPosition
  //     await tx.application.updateMany({
  //       where: { positions_id: position.id },
  //       data: {
  //         status: "CLOSED",
  //         finished_at: new Date(),
  //         action_by_admin: adminId,
  //         positions_id: archivedPosition.id,
  //       },
  //     })

  //     // Deleta a posição antiga
  //     await tx.position.delete({
  //       where: { id: position.id },
  //     })

  //     return { archivedPosition }
  //   })
  // },
}
