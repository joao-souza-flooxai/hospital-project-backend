import { ZodError } from 'zod';

export const errorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    const validationErrors = error.errors.map(err => ({
      path: err.path.join('.'),
      message: err.message
    }));
    return reply.status(400).send({
      message: "Validation error",
      errors: validationErrors
    });
  }

  if (error.name === 'ClientError') {
    return reply.status(400).send({
      message: error.message
    });
  }

  console.error(error);
  return reply.status(500).send({ message: "Internal Server Error" });
}
