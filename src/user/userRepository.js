import { prisma } from "../prisma/client.js"

export const userRepository = {
  create: async (data) => {
    return await prisma.user.create({
      data
    });
  },

  findById: async (id) => {
    return await prisma.user.findUnique({
      where: { id }
    });
  },

  findByEmail: async (email) => {
    return await prisma.user.findUnique({
      where: { email }
    });
  },

  findByDocument: async (document) => {
    return await prisma.user.findUnique({
      where: { document }
    });
  },

  update: async (id, data) => {
    return await prisma.user.update({
      where: { id },
      data
    });
  },

  delete: async (id) => {
    return await prisma.user.delete({
      where: { id }
    });
  },

  listAll: async () => {
    return await prisma.user.findMany();
  },
  
  findLeaderboard: async (limit) => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      location: true,
      score: true,
    },
    orderBy: {
      score: 'desc',
    },
    take: limit, 
  });
}

};
