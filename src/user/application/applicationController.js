import {applicationService} from "./applicationService.js"

export const applicationController = {

  create: async (req, reply) => {
    console.log(req.user.id);
    console.log(req.body);
    const { positions_id } = req.body;
    const user_id = req.user.id;

    const result = await applicationService.create({ user_id, positions_id });

    return reply.send(result);
  },

  getMyApplications: async (req, reply) => {
    const user_id = req.user.id;
    const result = await applicationService.getMyApplications(user_id);

    return reply.send(result);
  },

  getById: async (req, reply) => {
    const { id } = req.params;
    const user_id = req.user.id;

    const result = await applicationService.getById(id, user_id);

    return reply.send(result);
  },

  delete: async (req, reply) => {
    const { id } = req.params;
    const user_id = req.user.id;

    await applicationService.delete(id, user_id);

    return reply.send({ message: 'Subscrition canceled' });
  }
};
