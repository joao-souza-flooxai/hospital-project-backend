import { adminRepository } from './adminRepository.js'
import { ClientError } from '../errors/clientError.js'
import bcrypt from 'bcryptjs'

export const adminService = {
  create: async (data) => {
    const existing = await adminService.getByEmail(data.email)
    if (existing) throw new ClientError('Email already in use')

    const hashedPassword = await bcrypt.hash(data.password, 10)
    const admin = await adminRepository.create({ ...data, password: hashedPassword })

    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      hospital_id: admin.hospital_id
    }
  },

  getById: async (id) => {
    const admin = await adminRepository.findById(id)
    if (!admin) throw new ClientError('Admin not found')
    return admin
  },

  getByEmail: async (email) => {
    const admin = await adminRepository.findByEmail(email)
    return admin || null
  },

  listAll: async () => {
    return await adminRepository.listAll()
  },

  update: async (id, data) => {
    const existing = await adminService.getById(id)
    if (!existing) throw new ClientError('Admin not found')

    if (data.email) {
      const existingEmail = await adminService.getByEmail(data.email)
      if (existingEmail && existingEmail.id !== id) {
        throw new ClientError('Email already in use')
      }
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10)
    }

    const updated = await adminRepository.update(id, data)
    return updated
  },

  delete: async (id) => {
    return await adminRepository.delete(id)
  }
}
