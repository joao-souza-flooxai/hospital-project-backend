//helper interessante, mas pra produção pode consumir o plano grátis

import cron from 'node-cron';
import { prisma } from '../prisma/client.js';

cron.schedule('*/30 * * * *', async () => {
  console.log(' Verificando vagas expiradas...');

  try {
    const updated = await prisma.position.updateMany({
      where: {
        finished_at: {
          lte: new Date(),
        },
        isExpired: false, 
      },
      data: {
        isExpired: true,
        status: 'CLOSED', 
      },
    });

    console.log(` ${updated.count} vaga(s) foram marcadas como expirada(s) e fechada(s).`);
  } catch (error) {
    console.error('Erro ao atualizar vagas expiradas:', error);
  }
});
