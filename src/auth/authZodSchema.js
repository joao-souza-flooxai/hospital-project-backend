import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5)
})

export const loginResponseSchema = z.object({
  success: z.boolean(),
  admin: z.object({
    id: z.number(),
    email: z.string().email()
  })
})