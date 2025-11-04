import { z } from 'zod';

export const enrollmentStatusEnum = z.enum(['enrolled', 'completed', 'dropped']);
export const enrollmentPaymentStatusEnum = z.enum(['pending', 'paid', 'failed', 'refunded']);

export type EnrollmentStatus = z.infer<typeof enrollmentStatusEnum>;
export type EnrollmentPaymentStatus = z.infer<typeof enrollmentPaymentStatusEnum>;

export const enrollmentSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  courseId: z.string().uuid(),
  enrollmentDate: z.date(),
  completionDate: z.date().nullable(),
  status: enrollmentStatusEnum,
  paymentStatus: enrollmentPaymentStatusEnum,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Enrollment = z.infer<typeof enrollmentSchema>;

export const createEnrollmentSchema = z.object({
  courseId: z.string().uuid(),
});

export type CreateEnrollmentInput = z.infer<typeof createEnrollmentSchema>;

export const updateEnrollmentStatusSchema = z.object({
  status: enrollmentStatusEnum,
  completionDate: z.coerce.date().optional(),
});

export type UpdateEnrollmentStatusInput = z.infer<typeof updateEnrollmentStatusSchema>;
