import { z } from 'zod';

export const courseStatusEnum = z.enum(['draft', 'published', 'archived']);

export type CourseStatus = z.infer<typeof courseStatusEnum>;

export const courseSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().nullable(),
  durationHours: z.number().int().positive(),
  price: z.number().nonnegative(),
  instructorId: z.string().uuid().nullable(),
  maxStudents: z.number().int().positive().nullable(),
  status: courseStatusEnum,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Course = z.infer<typeof courseSchema>;

export const createCourseSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  durationHours: z.number().int().positive(),
  price: z.number().nonnegative(),
  instructorId: z.string().uuid().optional(),
  maxStudents: z.number().int().positive().optional(),
  status: courseStatusEnum.optional(),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;

export const updateCourseSchema = createCourseSchema.partial();

export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
