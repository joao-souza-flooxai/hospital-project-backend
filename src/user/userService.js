import { ClientError } from '../errors/clientError.js'
import { userRepository } from './userRepository.js'
import bcrypt from 'bcryptjs'

export const userService = {
  create: async (data) => {
    await ensureUniqueFields({ email: data.email, document: data.document })

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const userToCreate = {
      ...data,
      password: hashedPassword
    }

    const user = await userRepository.create(userToCreate)

    return {
      id: user.id,
      name: user.name,
      email: user.email
    }
  },

  getById: async (id) => {
    const user = await userRepository.findById(id)
    if (!user) {
      throw new ClientError('User not found')
    }
    return user
  },

  listAll: async () => {
    return await userRepository.listAll()
  },

  delete: async (id) => {
    return await userRepository.delete(id)
  },

  update: async (id, data) => {
    const userExists = await userRepository.findById(id)
    if (!userExists) {
      throw new ClientError('User not found')
    }

    await ensureUniqueFields({ 
      email: data.email, 
      document: data.document, 
      userIdToExclude: id 
    })

    const updatedUser = await userRepository.update(id, data)
    return updatedUser
  }
}

async function ensureUniqueFields({ email, document, userIdToExclude = null }) {
  if (email) {
    const existingEmail = await userRepository.findByEmail(email);
    if (existingEmail && existingEmail.id !== userIdToExclude) {
      throw new ClientError('Email already in use');
    }
  }

  if (document) {
    const existingDocument = await userRepository.findByDocument(document);
    if (existingDocument && existingDocument.id !== userIdToExclude) {
      throw new ClientError('Document already in use');
    }
  }
}

