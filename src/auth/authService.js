import { adminRepository }   from "../admin/adminRepository.js";
import bcrypt from 'bcryptjs';
import { ClientError } from "../errors/clientError.js";
import { authZodSchemas } from "./authZodSchema.js";
import { userRepository } from "../user/userRepository.js";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

export const authService = {

   login: async ({ email, password }, isAdmin = false) => {
    const repo = isAdmin ? adminRepository : userRepository
    const entity = await repo.findByEmail(email)

    if (!entity) throw new ClientError('Invalid Credentials')

    const validPassword = await bcrypt.compare(password, entity.password)
    if (!validPassword) throw new ClientError('Invalid Credentials')

    const token = jwt.sign(
      {
        id: entity.id,
        role: isAdmin ? 'admin' : 'user',
        hospital_id: entity.hospital_id || null
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    )

    return {
      id: entity.id,
      email: entity.email,
      role: isAdmin ? 'admin' : 'user',
      token
    }
  }
}
