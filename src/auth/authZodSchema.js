import { z } from 'zod'

export const authZodSchemas = {
    loginSchema: z.object({

      email: z.string().email('Invalid email address'),
      password: z.string().min(5, 'Password must be at least 5 characters long')

    }),

    loginResponse: z.object({

      success: z.boolean(),
      admin: z.object({
        id: z.number(),
        email: z.string().email()

      })
    }),

     registerSchema: z.object({
      name: z.string().min(3, 'Name too short.'),
      document: z.string().min(5, 'Document invalid.'),
      email: z.string().email('Invalid email address'),
      password: z.string().min(5, 'Password must be at least 5 characters long'),
      age: z.coerce.number().int().positive('Age must be a positive number'),
      gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
      location: z.string().min(2, 'Location invalid.')
    })
};