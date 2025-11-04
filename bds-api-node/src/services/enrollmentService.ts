import { getPool } from '../db';
import {
  CreateEnrollmentInput,
  Enrollment,
  EnrollmentPaymentStatus,
  EnrollmentStatus,
  enrollmentPaymentStatusEnum,
  enrollmentStatusEnum,
} from '../models/enrollment';
import { UserRole } from '../models/user';
import { AppError } from '../utils/errors';
import { buildPaginatedResponse, resolvePagination } from '../utils/pagination';
import { mapEnrollmentRow } from '../utils/mappers';

type Actor = {
  id: string;
  role: UserRole;
};

type ListParams = {
  page?: number;
  limit?: number;
  status?: EnrollmentStatus;
  userId?: string;
};

const ensureCourseExists = async (courseId: string) => {
  const pool = getPool();
  const { rows } = await pool.query('SELECT * FROM courses WHERE id = $1', [courseId]);

  if (rows.length === 0) {
    throw new AppError('Course not found', 404);
  }

  return rows[0];
};

export const createEnrollment = async (input: CreateEnrollmentInput, actor: Actor): Promise<Enrollment> => {
  const pool = getPool();
  if (actor.role !== 'student') {
    throw new AppError('Only students can enroll in courses', 403);
  }

  const course = await ensureCourseExists(input.courseId);

  const existing = await pool.query(
    'SELECT id FROM enrollments WHERE user_id = $1 AND course_id = $2',
    [actor.id, input.courseId]
  );

  if ((existing.rowCount ?? 0) > 0) {
    throw new AppError('You are already enrolled in this course', 409);
  }

  if (course.max_students) {
    const { rows: countRows } = await pool.query(
      `
        SELECT COUNT(*)::int AS count
        FROM enrollments
        WHERE course_id = $1 AND status IN ('enrolled', 'completed')
      `,
      [input.courseId]
    );

    if (countRows[0]?.count >= course.max_students) {
      throw new AppError('Course is full', 400);
    }
  }

  const { rows } = await pool.query(
    `
      INSERT INTO enrollments (user_id, course_id)
      VALUES ($1, $2)
      RETURNING *
    `,
    [actor.id, input.courseId]
  );

  return mapEnrollmentRow(rows[0]);
};

export const listEnrollments = async (actor: Actor, params: ListParams = {}) => {
  const pagination = resolvePagination({ page: params.page, limit: params.limit });
  const conditions: string[] = [];
  const values: Array<string | number> = [];

  if (actor.role !== 'admin') {
    conditions.push(`user_id = $${values.length + 1}`);
    values.push(actor.id);
  } else if (params.userId) {
    conditions.push(`user_id = $${values.length + 1}`);
    values.push(params.userId);
  }

  if (params.status) {
    conditions.push(`status = $${values.length + 1}`);
    values.push(enrollmentStatusEnum.parse(params.status));
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const pool = getPool();

  const dataQuery = `
    SELECT *
    FROM enrollments
    ${whereClause}
    ORDER BY enrollment_date DESC
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2}
  `;

  const countQuery = `
    SELECT COUNT(*)::int AS count
    FROM enrollments
    ${whereClause}
  `;

  const dataValues = [...values, pagination.limit, pagination.offset];
  const [dataResult, countResult] = await Promise.all([
    pool.query(dataQuery, dataValues),
    pool.query(countQuery, values),
  ]);

  const enrollments = dataResult.rows.map(mapEnrollmentRow);
  const total = countResult.rows[0]?.count ?? 0;

  return buildPaginatedResponse(enrollments, total, pagination);
};

export const getEnrollmentById = async (actor: Actor, id: string): Promise<Enrollment> => {
  const pool = getPool();
  const { rows } = await pool.query(
    `
      SELECT e.*, c.instructor_id
      FROM enrollments e
      JOIN courses c ON c.id = e.course_id
      WHERE e.id = $1
    `,
    [id]
  );

  if (rows.length === 0) {
    throw new AppError('Enrollment not found', 404);
  }

  const enrollmentRow = rows[0];

  if (
    actor.role !== 'admin' &&
    actor.id !== enrollmentRow.user_id &&
    !(actor.role === 'instructor' && actor.id === enrollmentRow.instructor_id)
  ) {
    throw new AppError('You do not have access to this enrollment', 403);
  }

  return mapEnrollmentRow(enrollmentRow);
};

export const completeEnrollment = async (actor: Actor, id: string): Promise<Enrollment> => {
  const pool = getPool();
  const enrollment = await getEnrollmentById(actor, id);

  if (actor.role === 'student' && actor.id !== enrollment.userId) {
    throw new AppError('Students can only complete their own enrollment', 403);
  }

  const { rows } = await pool.query(
    `
      UPDATE enrollments
      SET status = 'completed', completion_date = NOW()
      WHERE id = $1
      RETURNING *
    `,
    [id]
  );

  return mapEnrollmentRow(rows[0]);
};

export const updateEnrollmentPaymentStatus = async (
  enrollmentId: string,
  status: EnrollmentPaymentStatus
): Promise<void> => {
  const pool = getPool();
  await pool.query(
    'UPDATE enrollments SET payment_status = $1 WHERE id = $2',
    [enrollmentPaymentStatusEnum.parse(status), enrollmentId]
  );
};
