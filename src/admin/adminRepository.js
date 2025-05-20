import  { prisma } from "../prisma/client.js";

export const adminRepository = {
    findbyEmail: async (email) =>{
        return prisma.admin.findUnique({where: {email}});
    }
}