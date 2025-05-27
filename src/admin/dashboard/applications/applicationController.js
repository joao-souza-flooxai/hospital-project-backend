import { applicationService } from './applicationService.js'

export const applicationController = {
  async updateStatus({ req, reply }) {
    try {
      const { id } = req.params
      const { status } = req.body
      const adminId = req.user.id
      console.log(id, status, adminId)
      if (!status) {
        return reply.status(400).send({ message: 'Status é obrigatório' })
      }

      const updatedApplication = await applicationService.updateStatus({
        applicationId: id,
        status,
        adminId,
      })

      return reply.send({
        message: 'Status atualizado com sucesso',
        data: updatedApplication,
      })
    } catch (error) {
      console.error(error)
      return reply.status(400).send({
        message: error.message || 'Erro ao atualizar status da aplicação',
      })
    }
  },

  async listAll({ req, reply }) {
    try {
      const adminId = req.user.id
      const hospitalId = req.user.hospital_id

      const applications = await applicationService.listAll({ adminId, hospitalId })

      return reply.send(applications)
    } catch (error) {
      console.error(error)
      return reply.status(500).send({
        message: 'Erro ao listar as aplicações',
      })
    }
  },
}
