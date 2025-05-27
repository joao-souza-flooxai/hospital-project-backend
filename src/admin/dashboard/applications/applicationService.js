import { prisma } from "../../../prisma/client.js"

export const applicationService = {
  async updateStatus({ applicationId, status, adminId }) {
    const application = await prisma.application.findUniqueOrThrow({
      where: { id: applicationId },
      include: { position: true, user: true },
    })

    const admin = await prisma.admin.findUniqueOrThrow({
      where: { id: adminId },
    })

    if (application.position.hospital_id !== admin.hospital_id) {
      throw new Error('Not authorized')
    }

    if (!['ACTIVE', 'CLOSED'].includes(status)) {
      throw new Error('Invalid status')
    }

    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: {
        status,
        finished_at: new Date(),
        action_by_admin: admin.id,
        approved_at: status === 'ACTIVE' ? new Date() : null,
      },
    })

    if (status === 'ACTIVE') {
      await prisma.user.update({
        where: { id: application.user_id },
        data: {
          score: application.user.score + application.position.score,
        },
      })
    }

    return updatedApplication
  },

  async listAll({ adminId, hospitalId }) {
    const admin = await prisma.admin.findUniqueOrThrow({
      where: { id: adminId },
    })

    if (admin.hospital_id !== hospitalId) {
      throw new Error('Not authorized')
    }

    return prisma.application.findMany({
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
