import { ClientError } from "../../../errors/clientError.js"
import { prisma } from "../../../prisma/client.js"

export const applicationService = {

async updateStatus({ applicationId, status, adminId }) {
  const application = await prisma.application.findUniqueOrThrow({
    where: { id: applicationId },
    include: { user: true, position: true },
  })

  const admin = await prisma.admin.findUniqueOrThrow({
    where: { id: adminId },
  })

  if (application.position.hospital_id !== admin.hospital_id) {
    throw new ClientError('Not authorized')
  }

  if (!['ACTIVE', 'CLOSED'].includes(status)) {
    throw new ClientError('Invalid status')
  }

  const operations = []

  const updateApplication = prisma.application.update({
    where: { id: applicationId },
    data: {
      status,
      finished_at: new Date(),
      action_by_admin: admin.id,
      approved_at: status === 'ACTIVE' ? new Date() : null,
    },
  })

  operations.push(updateApplication)

  if (status === 'ACTIVE') {
    const updateUser = prisma.user.update({
      where: { id: application.user_id },
      data: {
        score: application.user.score + application.position.score,
      },
    })
    operations.push(updateUser)
  } else {
    const updatePosition = prisma.position.update({
      where: { id: application.positions_id },
      data: {
        spots: { increment: 1 },
      },
    })
    operations.push(updatePosition)
  }

  await prisma.$transaction(operations)

  const updatedPosition = await prisma.position.findUniqueOrThrow({
    where: { id: application.positions_id },
  })

  const updatedApplication = await prisma.application.findUniqueOrThrow({
    where: { id: applicationId },
    include: { user: true,  position: true},
  })

  return {
    application: updatedApplication,
    position: updatedPosition,
  }
},

  async listAll({ adminId, hospitalId }) {
    const admin = await prisma.admin.findUniqueOrThrow({
      where: { id: adminId },
    })

    if (admin.hospital_id !== hospitalId) {
      throw new ClientError('Not authorized')
    }

    const applications = await prisma.application.findMany({
      where: {
        position: {
          hospital_id: hospitalId,
        },
      },
      include: {
        user: true,
        position: true,
      },
    })


    const ordered = applications.sort((a, b) => {
      const order = { PENDING: 1, ACTIVE: 2, CLOSED: 3 }
      return order[a.status] - order[b.status]
  })

  return ordered
},

  async listByUser({ userId, adminId }) {
    const admin = await prisma.admin.findUniqueOrThrow({
      where: { id: adminId },
    })

    return prisma.application.findMany({
      where: {
        user_id: userId,
        position: { hospital_id: admin.hospital_id },
      },
      include: {
        position: true,
      },
    })
  },
}
