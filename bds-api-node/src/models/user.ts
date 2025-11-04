import { z } from 'zod';

export const userRoleEnum = z.enum(['student', 'instructor', 'admin']);

export type UserRole = z.infer<typeof userRoleEnum>;

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  passwordHash: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: userRoleEnum,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof userSchema>;

export const publicUserSchema = userSchema.omit({ passwordHash: true });

export type PublicUser = z.infer<typeof publicUserSchema>;

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: userRoleEnum.optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  role: userRoleEnum.optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
