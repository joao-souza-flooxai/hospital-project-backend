import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'

export const errorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    const validationErrors = error.errors.map(err => ({
      path: err.path.join('.'),
      message: err.message,
    }))
    console.warn('Validation Error:', validationErrors)

    return reply.status(400).send({
      message: 'Validation error',
      errors: validationErrors,
    })
  }


  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error('Prisma Known Error:', error)

    return reply.status(400).send({
      message: 'Database error. Check your data and try again.',
    })
  }


  if (error instanceof Prisma.PrismaClientValidationError) {
    console.error('Prisma Validation Error:', error)

    return reply.status(400).send({
      message: 'Invalid input. Check the data sent to the server.',
    })
  }


  if (error instanceof Prisma.PrismaClientRustPanicError) {
    console.error('Database Panic:', error)
    return reply.status(500).send({
      message: 'A database error occurred. Try again later.',
    })
  }

  if (error.name === 'ClientError') {
    return reply.status(400).send({
      message: error.message,
    })
  }

  console.error('Unhandled Error:', error)

  return reply.status(500).send({
    message: 'Internal Server Error',
  })
}
