import { getPool } from '../db';
import {
  Course,
  CourseStatus,
  CreateCourseInput,
  UpdateCourseInput,
  courseStatusEnum,
} from '../models/course';
import { AppError } from '../utils/errors';
import { buildPaginatedResponse, resolvePagination } from '../utils/pagination';
import { mapCourseRow } from '../utils/mappers';
import { UserRole } from '../models/user';

type ListCoursesParams = {
  page?: number;
  limit?: number;
  status?: CourseStatus;
  instructorId?: string;
  search?: string;
};

type Actor = {
  id: string;
  role: UserRole;
};

const ensureInstructorExists = async (instructorId: string): Promise<void> => {
  const pool = getPool();
  const { rows } = await pool.query('SELECT role FROM users WHERE id = $1', [instructorId]);

  if (rows.length === 0) {
    throw new AppError('Instructor not found', 404);
  }

  const role = rows[0].role as UserRole;
  if (role !== 'instructor' && role !== 'admin') {
    throw new AppError('Assigned user must be an instructor or admin', 400);
  }
};

export const listCourses = async (params: ListCoursesParams = {}) => {
  const { status, instructorId, search } = params;
  const pagination = resolvePagination({ page: params.page, limit: params.limit });

  const conditions: string[] = [];
  const values: Array<string | number> = [];

  if (status) {
    conditions.push(`status = $${values.length + 1}`);
    values.push(courseStatusEnum.parse(status));
  }

  if (instructorId) {
    conditions.push(`instructor_id = $${values.length + 1}`);
    values.push(instructorId);
  }

  if (search) {
    const idx = values.length + 1;
    conditions.push(`(title ILIKE $${idx} OR description ILIKE $${idx})`);
    values.push(`%${search}%`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const pool = getPool();

  const dataQuery = `
    SELECT *
    FROM courses
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2}
  `;

  const countQuery = `
    SELECT COUNT(*)::int AS count
    FROM courses
    ${whereClause}
  `;

  const dataValues = [...values, pagination.limit, pagination.offset];
  const [dataResult, countResult] = await Promise.all([
    pool.query(dataQuery, dataValues),
    pool.query(countQuery, values),
  ]);

  const courses = dataResult.rows.map(mapCourseRow);
  const total = countResult.rows[0]?.count ?? 0;

  return buildPaginatedResponse(courses, total, pagination);
};

export const getCourseById = async (id: string): Promise<Course> => {
  const pool = getPool();
  const { rows } = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);

  if (rows.length === 0) {
    throw new AppError('Course not found', 404);
  }

  return mapCourseRow(rows[0]);
};

export const createCourse = async (input: CreateCourseInput, actor: Actor): Promise<Course> => {
  const pool = getPool();
  const instructorId = input.instructorId ?? (actor.role === 'instructor' ? actor.id : null);

  if (instructorId) {
    await ensureInstructorExists(instructorId);
  }

  if (actor.role === 'instructor' && instructorId !== actor.id) {
    throw new AppError('Instructors can only assign courses to themselves', 403);
  }

  const status = input.status ? courseStatusEnum.parse(input.status) : 'draft';

  const { rows } = await pool.query(
    `
      INSERT INTO courses (title, description, duration_hours, price, instructor_id, max_students, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `,
    [
      input.title,
      input.description ?? null,
      input.durationHours,
      input.price,
      instructorId,
      input.maxStudents ?? null,
      status,
    ]
  );

  return mapCourseRow(rows[0]);
};

export const updateCourse = async (
  id: string,
  input: UpdateCourseInput,
  actor: Actor
): Promise<Course> => {
  const pool = getPool();
  const existing = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);

  if (existing.rowCount === 0) {
    throw new AppError('Course not found', 404);
  }

  const courseRow = existing.rows[0];

  if (actor.role === 'instructor' && courseRow.instructor_id !== actor.id) {
    throw new AppError('Instructors can only modify their own courses', 403);
  }

  const updates: string[] = [];
  const values: Array<string | number | null> = [];
  let index = 1;

  if (input.title !== undefined) {
    updates.push(`title = $${index++}`);
    values.push(input.title);
  }

  if (input.description !== undefined) {
    updates.push(`description = $${index++}`);
    values.push(input.description ?? null);
  }

  if (input.durationHours !== undefined) {
    updates.push(`duration_hours = $${index++}`);
    values.push(input.durationHours);
  }

  if (input.price !== undefined) {
    updates.push(`price = $${index++}`);
    values.push(input.price);
  }

  if (input.instructorId !== undefined) {
    if (actor.role === 'instructor') {
      throw new AppError('Instructors cannot reassign courses', 403);
    }

    if (input.instructorId) {
      await ensureInstructorExists(input.instructorId);
    }

    updates.push(`instructor_id = $${index++}`);
    values.push(input.instructorId ?? null);
  }

  if (input.maxStudents !== undefined) {
    updates.push(`max_students = $${index++}`);
    values.push(input.maxStudents ?? null);
  }

  if (input.status !== undefined) {
    updates.push(`status = $${index++}`);
    values.push(courseStatusEnum.parse(input.status));
  }

  if (updates.length === 0) {
    return mapCourseRow(courseRow);
  }

  values.push(id);

  const { rows } = await pool.query(
    `
      UPDATE courses
      SET ${updates.join(', ')}
      WHERE id = $${index}
      RETURNING *
    `,
    values
  );

  return mapCourseRow(rows[0]);
};

export const deleteCourse = async (id: string): Promise<void> => {
  const pool = getPool();
  const { rowCount } = await pool.query('DELETE FROM courses WHERE id = $1', [id]);

  if (rowCount === 0) {
    throw new AppError('Course not found', 404);
  }
};
