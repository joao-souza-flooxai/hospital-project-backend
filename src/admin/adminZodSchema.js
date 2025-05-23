import { z } from 'zod'

const createAdminSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  hospital_id: z.string().uuid('Invalid hospital ID'),
})

const updateAdminSchema = createAdminSchema.omit({ hospital_id: true, password:true })

export const adminZodSchema = {
  create: createAdminSchema,
  update: updateAdminSchema,
}
