import { positionRepository } from "./positionRepository.js"
import { ClientError } from "../../../errors/clientError.js";


export const positionService = {
  create: async (data) => {
   const score = getScoreByType(data.type);

    return await positionRepository.create({
      ...data,
      score,
    });
  },

  update: async (id, data, hospitalId) => {
    const existing = await positionRepository.findById(id)

    if (!existing || existing.hospital_id !== hospitalId) {
      throw new ClientError("Position not found or unauthorized", 403)
    }

    return await positionRepository.update(id, data)
  },

  delete: async (id, hospitalId) => {
    const existing = await positionRepository.findById(id)

    if (!existing || existing.hospital_id !== hospitalId) {
      throw new ClientError("Position not found or unauthorized", 403)
    }

    return await positionRepository.delete(id)
  },

  list: async (hospitalId) => {
    return await positionRepository.findAllByHospital(hospitalId)
  }
}

function getScoreByType(type) {
  switch (type) {
    case 'IDOSOS':
      return 500;
    case 'JOVENS':
      return 300;
    case 'FAMILIAR':
      return 300;
    default:
      return 0;
  }
}
