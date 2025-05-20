import { adminRepository }   from "../admin/adminRepository.js";
import bcrypt from 'bcryptjs';
import { ClientError } from "../errors/clientError.js";
import { authZodSchemas } from "./authZodSchema.js";

export const authService = {

  login: async ({ email, password }, isAdmin = false) => {

    const repo = isAdmin ? adminRepository : userRepository
    const entity = await repo.findbyEmail(email)

    if (!entity) throw new ClientError('Invalid Credentials')

    const validPassword = await bcrypt.compare(password, entity.password)
    if (!validPassword) throw new ClientError('Invalid Credentials')

    //ToDo padrozinar Responses.
    return {
      id: entity.id,
      email: entity.email,
      role: isAdmin ? 'admin' : 'user'
    }
  }
}
