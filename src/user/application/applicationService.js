import {applicationRepository} from "./applicationRepository.js"
import { positionService } from "../../positions/positionService.js";

export const applicationService  = {

 create: async ({ user_id, positions_id }) => {
    const existing = await applicationRepository.findByUserAndPosition(user_id, positions_id);
    if (existing) throw new Error('Você já se inscreveu para essa posição.');

    const position = await positionService.findById(positions_id);
    if (!position) throw new Error('Posição não encontrada.');

    if (position.spots <= 0) {
      throw new Error('Não há mais vagas disponíveis para essa posição.');
    }

    return await applicationRepository.$transaction(async (prisma) => {
      const app = await prisma.application.create({
          data: {
            user: { connect: { id: user_id } },
            position: { connect: { id: positions_id } },
            status: 'PENDING',
            created_at: new Date(),
           
          }
      });

      await prisma.position.update({
        where: { id: positions_id },
        data: { spots: { decrement: 1 } }
      });

      return app;
    });
  },

getMyApplications: async (user_id) => {
  const applications = await applicationRepository.findByUser(user_id)

  return applications.map(app => ({
    id: app.id,
    title: app.position.title,
    description: app.position.description,
    status: app.status,
    hospitalName: app.position.hospital?.name || 'N/A',
    hospitalLocation: app.position.hospital?.location || 'N/A',
  }))
},


  getById: async (id, user_id) => {
    const app = await applicationRepository.findById(id);
    if (!app) throw new Error('Inscrição não encontrada');
    if (app.user_id !== user_id) throw new Error('Acesso negado');
    return app;
  },

  delete: async (id, user_id) => {
    const app = await applicationRepository.findById(id);
    if (!app) throw new Error('Inscrição não encontrada');
    if (app.user_id !== user_id) throw new Error('Acesso negado');
    if (app.status !== 'pending') throw new Error('Não é possível cancelar uma inscrição já analisada');

    return await applicationRepository.$transaction(async (prisma) => {
      await prisma.application.delete({ where: { id } });

      await prisma.position.update({
        where: { id: app.positions_id },
        data: { spots: { increment: 1 } }
      });

      return { message: 'Inscrição cancelada' };
    });
  }
};
