import  { prisma } from "../prisma/client.js";

export const adminRepository = {
    findByEmail: async (email) =>{
        return prisma.admin.findUnique({where: {email}});
    },
     findById: async (id) =>{
        return prisma.admin.findUnique({where: {id}});
    },
    update: async (id, data) =>{
        return prisma.admin.update({
            where: { id },
            data,
        });
    }
}