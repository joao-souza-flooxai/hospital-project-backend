import { positionRepository } from "./positionRepository.js"
import { ClientError } from "../../../errors/clientError.js"
import { adminRepository } from "../../adminRepository.js"
export const positionService = {
  async create(data) {
    const score = getScoreByType(data.type)
    return await positionRepository.create({ ...data, score })
  },

  async update(id, data, hospitalId) {
    const existing = await positionRepository.findById(id)

    if (!existing || existing.hospital_id !== hospitalId) {
      throw new ClientError("Position not found or unauthorized", 403)
    }

    return await positionRepository.update(id, data)
  },

  // async deleteAndArchive({ id, hospitalId, adminId }) {
  //   const existing = await positionRepository.findByIdWithApplications(id)

  //   if (!existing || existing.hospital_id !== hospitalId) {
  //     throw new ClientError("Position not found or unauthorized", 403)
  //   }

  //   return await positionRepository.deleteAndArchive({
  //     position: existing,
  //     adminId,
  //   })
  // },

   delete: async ({ id, hospitalId, adminId }) => {
 
    const admin = await adminRepository.findById(adminId)

    if (!admin || admin.hospital_id !== hospitalId) {
      throw new Error('Você não tem permissão para deletar esta posição')
    }


    const position = await positionRepository.findByIdAndHospital(id, hospitalId)

    if (!position) {
      throw new Error('Position não encontrada ou não pertence ao seu hospital')
    }


    await positionRepository.delete(id)

    return { message: 'Position deletada com sucesso' }},


  async list({ hospitalId, filter, page = 1, pageSize = 10, orderBy = 'created_at', orderDirection = 'desc' }) {
  const skip = (page - 1) * pageSize

  const [positions, total] = await Promise.all([
    positionRepository.findManyByHospital({ hospitalId, filter, skip, take: pageSize, orderBy, orderDirection }),
    positionRepository.countByHospital({ hospitalId, filter }),
  ])

  return {
    positions,
    totalPages: Math.ceil(total / pageSize),
  }
}

}

function getScoreByType(type) {
  switch (type) {
    case 'IDOSOS': return 500
    case 'JOVENS': return 300
    case 'FAMILIAR': return 300
    default: return 0
  }
}
