import { getPool } from '../db';
import { CourseStatus } from '../models/course';
import { buildPaginatedResponse, resolvePagination } from '../utils/pagination';
import { mapCourseRow } from '../utils/mappers';
import { listUsers as listUsersService } from './userService';

export const getAdminStats = async () => {
  const pool = getPool();

  const queries = await Promise.all([
    pool.query('SELECT COUNT(*)::int AS count FROM users'),
    pool.query('SELECT COUNT(*)::int AS count FROM courses'),
    pool.query('SELECT COUNT(*)::int AS count FROM enrollments'),
    pool.query("SELECT COALESCE(SUM(amount), 0)::numeric AS total FROM payments WHERE status = 'succeeded'"),
  ]);

  return {
    totalUsers: queries[0].rows[0]?.count ?? 0,
    totalCourses: queries[1].rows[0]?.count ?? 0,
    totalEnrollments: queries[2].rows[0]?.count ?? 0,
    totalRevenue: Number(queries[3].rows[0]?.total ?? 0),
  };
};

export const listAdminUsers = listUsersService;

type ListCoursesParams = {
  page?: number;
  limit?: number;
  status?: CourseStatus;
};

export const listAdminCourses = async (params: ListCoursesParams = {}) => {
  const pagination = resolvePagination({ page: params.page, limit: params.limit });
  const pool = getPool();
  const conditions: string[] = [];
  const values: Array<string | number> = [];

  if (params.status) {
    conditions.push(`c.status = $${values.length + 1}`);
    values.push(params.status);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const dataQuery = `
    SELECT c.*, COALESCE(COUNT(e.id), 0) AS enrollment_count
    FROM courses c
    LEFT JOIN enrollments e ON e.course_id = c.id AND e.status IN ('enrolled', 'completed')
    ${whereClause}
    GROUP BY c.id
    ORDER BY c.created_at DESC
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2}
  `;

  const countQuery = `
    SELECT COUNT(*)::int AS count
    FROM courses c
    ${whereClause}
  `;

  const dataValues = [...values, pagination.limit, pagination.offset];
  const [dataResult, countResult] = await Promise.all([
    pool.query(dataQuery, dataValues),
    pool.query(countQuery, values),
  ]);

  const courses = dataResult.rows.map((row) => ({
    course: mapCourseRow(row),
    enrollmentCount: Number(row.enrollment_count ?? 0),
  }));

  const total = countResult.rows[0]?.count ?? 0;

  return buildPaginatedResponse(courses, total, pagination);
};
