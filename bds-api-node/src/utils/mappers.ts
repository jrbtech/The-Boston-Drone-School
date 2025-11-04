import { Course } from '../models/course';
import { Enrollment } from '../models/enrollment';
import { Payment } from '../models/payment';
import { PublicUser, User } from '../models/user';

const toDate = (value: string | Date | null): Date | null => {
  if (!value) {
    return null;
  }

  return value instanceof Date ? value : new Date(value);
};

export const mapUserRow = (row: any): User => ({
  id: row.id,
  email: row.email,
  passwordHash: row.password_hash,
  firstName: row.first_name,
  lastName: row.last_name,
  role: row.role,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
});

export const mapPublicUserRow = (row: any): PublicUser => {
  const user = mapUserRow(row);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _passwordHash, ...rest } = user;
  return rest;
};

export const mapCourseRow = (row: any): Course => ({
  id: row.id,
  title: row.title,
  description: row.description,
  durationHours: Number(row.duration_hours),
  price: Number(row.price),
  instructorId: row.instructor_id ?? null,
  maxStudents: row.max_students !== null ? Number(row.max_students) : null,
  status: row.status,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
});

export const mapEnrollmentRow = (row: any): Enrollment => ({
  id: row.id,
  userId: row.user_id,
  courseId: row.course_id,
  enrollmentDate: new Date(row.enrollment_date),
  completionDate: toDate(row.completion_date),
  status: row.status,
  paymentStatus: row.payment_status,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
});

export const mapPaymentRow = (row: any): Payment => ({
  id: row.id,
  userId: row.user_id,
  enrollmentId: row.enrollment_id,
  amount: Number(row.amount),
  stripePaymentIntentId: row.stripe_payment_intent_id,
  status: row.status,
  createdAt: new Date(row.created_at),
});
