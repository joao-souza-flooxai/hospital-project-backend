import { z } from 'zod';

export const adminZodSchema = {
  create: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    hospital_id: z.string().uuid('Invalid hospital ID')
  }),

  update: z.object({
    name: z.string().optional(),
    email: z.string().email('Invalid email').optional(),
    password: z.string().min(6, 'Password must be at least 6 characters').optional(),
    hospital_id: z.string().uuid('Invalid hospital ID').optional()
  })
};