import { ClientError } from '../errors/clientError.js'
import { userRepository } from './userRepository.js'
import bcrypt from 'bcryptjs'

export const userService = {
  create: async (data) => {
    await ensureUniqueFields({ email: data.email, document: data.document })

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await userRepository.create({
      ...data,
      password: hashedPassword
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email
    }
  },

  getById: async (id) => {
    const user = await userRepository.findById(id)
    if (!user) throw new ClientError('User not found')
    return user
  },

  getByEmail: async (email) => {
    const user = await userRepository.findByEmail(email)
    return user || null
  },

  listAll: async () => {
    return await userRepository.listAll()
  },

  update: async (id, data) => {
    const userExists = await userService.getById(id)
    if (!userExists) throw new ClientError('User not found')

    await ensureUniqueFields({
      email: data.email,
      document: data.document,
      userIdToExclude: id
    })

    const updatedUser = await userRepository.update(id, data)
    return updatedUser
  },

  delete: async (id) => {
    return await userRepository.delete(id)
  },
  leaderBoard: async (limit) => {
    return await userRepository.findLeaderboard(limit);
  } 
}

async function ensureUniqueFields({ email, document, userIdToExclude = null }) {
  if (email) {
    const existingEmail = await userService.getByEmail(email)
    if (existingEmail && existingEmail.id !== userIdToExclude) {
      throw new ClientError('Email already in use')
    }
  }

  if (document) {
    const existingDocument = await userRepository.findByDocument(document)
    if (existingDocument && existingDocument.id !== userIdToExclude) {
      throw new ClientError('Document already in use')
    }
  }
}
