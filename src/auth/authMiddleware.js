import jwt from 'jsonwebtoken'
import { ClientError } from '../errors/clientError.js'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  console.log("JWT_secret is not defined!");
  throw new Error('API Error.')
}

export function authMiddleware(requiredRole = null) {
  return async (request, reply) => {
    const authHeader = request.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ClientError('Missing or invalid token', 401)
    }

    const token = authHeader.split(' ')[1]

    try {
      const decoded = jwt.verify(token, JWT_SECRET)

      if (!decoded || !decoded.id || !decoded.role) {
        throw new ClientError('Invalid token payload', 401)
      }

      if (requiredRole && decoded.role !== requiredRole) {
        throw new ClientError('Unauthorized', 403)
      }

      request.user = decoded 
    } catch (err) {
      throw new ClientError('Invalid or expired token', 401)
    }
  }
}
