import {applicationRepository} from "./applicationRepository.js"
import { positionService } from "../../positions/positionService.js";
import { ClientError } from "../../errors/clientError.js";

export const applicationService  = {

 create: async ({ user_id, positions_id }) => {
    const existing = await applicationRepository.findByUserAndPosition(user_id, positions_id);
    if (existing) throw new ClientError('Você já se inscreveu para essa posição.');

    const position = await positionService.findById(positions_id);
    if (!position) throw new ClientError('Posição não encontrada.');

    if (position.spots <= 0) {
      throw new ClientError('Não há mais vagas disponíveis para essa posição.');
    }

    if (position.finished_at && new Date(position.finished_at) < new Date()) {
      throw new ClientError('Vaga já expirada!');
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

        const positionWithHospital = await prisma.position.findUnique({
          where: { id: positions_id },
          include: { hospital: true }
        });

        return {
          application: app,
          position: positionWithHospital
        };
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
    if (!app) throw new ClientError('Inscrição não encontrada');
    if (app.user_id !== user_id) throw new ClientError('Acesso negado');
    return app;
  },

  delete: async (id, user_id) => {
    const app = await applicationRepository.findById(id);
    if (!app) throw new ClientError('Inscrição não encontrada');
    if (app.user_id !== user_id) throw new ClientError('Acesso negado');
    if (app.status !== 'pending') throw new ClientError('Não é possível cancelar uma inscrição já analisada');

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
