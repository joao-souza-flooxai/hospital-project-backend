import { userService } from './userService.js'
import {userZodSchema} from './userZodSchema.js'

export const userController = {
  create: async ({ req, reply }) => {
    const data = userZodSchema.createUserSchema.parse(req.body)
    const user = await userService.create(data)
    return reply.status(201).send(user)
  },

  getById: async ({ req, reply }) => {
    const { id } = req.params
    const user = await userService.getById(id)
    return reply.send(user)
  },

  listAll: async ({ reply }) => {
    const users = await userService.listAll()
    return reply.send(users)
  },

  update: async ({ req, reply }) => {
    const { id } = req.params
    const data = userZodSchema.updateUserSchema.parse(req.body)
    const updatedUser = await userService.update(id, data)
    return reply.send(updatedUser)
  },

  delete: async ({ req, reply }) => {
    const { id } = req.params
    await userService.delete(id)
    return reply.status(204).send()
  }
}
