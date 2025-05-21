import  { prisma } from "../prisma/client.js";

export const adminRepository = {
    findByEmail: async (email) =>{
        return prisma.admin.findUnique({where: {email}});
    }
}