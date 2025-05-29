import { adminService } from '../admin/adminService.js'
import { userService } from '../user/userService.js'
import { prisma } from '../prisma/client.js' //por enquanto, mas precisa separar em um hospital service, talvez.
import { ClientError } from '../errors/clientError.js'


//Necessário tipar as responses para uma maior clareza
export const profileService = {

  getMe: async (user) => {
    const { id, role } = user

    if (role === 'admin') {
      const admin = await adminService.getById(id)

      if (!admin) throw new ClientError('Admin not found')

      const hospital = await prisma.hospital.findUnique({
        where: { id: admin.hospital_id }
      })

      return {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: 'admin',
        hospital: hospital?.name || 'Unknown'
      }
    }

    if (role === 'user') {
      const user = await userService.getById(id)

      if (!user) throw new ClientError('User not found')

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        document: user.document,
        age: user.age,
        gender: user.gender,
        location: user.location,
        role: 'user',
        score: user.score
      }
    }

    throw new ClientError('Invalid role')
  },

  updateMe: async (user, data) => {
    const { id, role } = user

    if (role === 'admin') {
      delete data.hospital
      delete data.hospital_id

      const updatedAdmin = await adminService.update(id, data)
      const hospital = await prisma.hospital.findUnique({
        where: { id: updatedAdmin.hospital_id }
      })
      return {
        id: updatedAdmin.id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        role: 'admin',
        hospital
      }
    }

    if (role === 'user') {
      delete data.score
      const updatedUser = await userService.update(id, data)

      
      return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        document: updatedUser.document,
        age: updatedUser.age,
        gender: updatedUser.gender,
        location: updatedUser.location,
        role: 'user'
      }
    }

    throw new ClientError('Invalid role')
  }
}
