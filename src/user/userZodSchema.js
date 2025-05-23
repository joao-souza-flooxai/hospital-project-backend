import { z } from 'zod'

const createUserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    document: z.string().min(1, 'Document is required'),
    password: z.string().min(5, 'Password must be at least 5 characters long'),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
        errorMap: () => ({ message: 'Gender must be MALE, FEMALE or OTHER' }),
    }),
    email: z.string().email('Invalid email address'),
    location: z.string().min(1, 'Location is required'),
    age: z.coerce.number().int().positive('Age must be a positive number'),
    score: z.coerce.number().nonnegative('Score must be a non-negative number'),
})

const userResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    document: z.string(),
    age: z.string(),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
    email: z.string().email(),
    location: z.string(),
    score: z.string(),
})

const updateUserSchema = createUserSchema.omit({ score: true , password:true})

export const userZodSchema = {
    createUserSchema,
    userResponseSchema,
    updateUserSchema,
}
