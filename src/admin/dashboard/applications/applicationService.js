import { prisma } from '../../../../lib/prisma.js'

export const applicationService = {
  async updateStatus({ applicationId, status, adminId }) {
    const application = await prisma.application.findUniqueOrThrow({
      where: { id: applicationId },
      include: { position: true },
    })

    const admin = await prisma.admin.findUniqueOrThrow({
      where: { id: adminId },
    })

    if (application.position.hospital_id !== admin.hospital_id) {
      throw new Error('Not authorized')
    }

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      throw new Error('Invalid status')
    }

    return prisma.application.update({
      where: { id: applicationId },
      data: {
        status,
        finished_at: new Date(),
        action_by_admin: admin.id,
        approved_at: status === 'APPROVED' ? new Date() : null,
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
