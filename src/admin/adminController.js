import { adminService } from './adminService.js';
import { adminZodSchema } from './adminZodSchema.js';

export const adminController = {
  create: async (request, reply) => {
    const data = adminZodSchema.create.parse(request.body);
    const result = await adminService.create(data);
    return reply.status(201).send(result);
  },

  getById: async (request, reply) => {
    const { id } = request.params;
    const admin = await adminService.getById(id);
    return reply.send(admin);
  },

  listAll: async (request, reply) => {
    const admins = await adminService.listAll();
    return reply.send(admins);
  },

  update: async (request, reply) => {
    const { id } = request.params;
    const data = adminZodSchema.update.parse(request.body);
    const result = await adminService.update(id, data);
    return reply.send(result);
  },

  delete: async (request, reply) => {
    const { id } = request.params;
    await adminService.delete(id);
    return reply.status(204).send();
  }
};
