import { positionRepository } from "./positionRepository.js"
import { ClientError } from "../../errors/clientError.js"


export const positionService = {
  create: async (data) => {
    return await positionRepository.create(data)
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
