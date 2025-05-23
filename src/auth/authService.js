import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ClientError } from '../errors/clientError.js'
import { userService } from '../user/userService.js'
import { adminService } from '../admin/adminService.js'

const JWT_SECRET = process.env.JWT_SECRET

export const authService = {
  async login({ email, password }, isAdmin = false) {
    const service = isAdmin ? adminService : userService
    const entity = await service.getByEmail(email)

    if (!entity) throw new ClientError('Invalid Credentials')

    const validPassword = await bcrypt.compare(password, entity.password)
    if (!validPassword) throw new ClientError('Invalid Credentials')

    return jwtSign({
      id: entity.id,
      email: entity.email,
      role: isAdmin ? 'admin' : 'user',
      hospital_id: entity.hospital_id || null
    })
  },

  async register(data) {
    const user = await userService.create({
      ...data,
      score: 0
    })

    return jwtSign({
      id: user.id,
      email: user.email,
      role: 'user'
    })
  }
}

function jwtSign({ id, email, role, hospital_id = null }) {
  const token = jwt.sign(
    { id, role, hospital_id },
    JWT_SECRET,
    { expiresIn: '1d' }
  )

  return {
    id,
    email,
    role,
    token
  }
}
