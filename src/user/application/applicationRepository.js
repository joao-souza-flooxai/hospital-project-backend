import { prisma } from "../../prisma/client.js"

export const applicationRepository = {
  create: (data) => prisma.application.create({ data }),

  findByUser: (user_id) => prisma.application.findMany({
    where: { user_id },
    include: { position: true },
  }),

  findById: (id) => prisma.application.findUnique({ where: { id } }),

  findByUserAndPosition: (user_id, positions_id) => prisma.application.findFirst({
    where: { user_id, positions_id }
  }),

  delete: (id) => prisma.application.delete({ where: { id } }),

  $transaction: (cb) => prisma.$transaction(cb)
};
