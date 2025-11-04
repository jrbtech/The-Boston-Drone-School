import { getPool } from '../db';
import { PublicUser, UpdateUserInput, UserRole, userRoleEnum } from '../models/user';
import { AppError } from '../utils/errors';
import { buildPaginatedResponse, resolvePagination } from '../utils/pagination';
import { mapPublicUserRow } from '../utils/mappers';
import { updateUserCredentials } from './authService';

type ListUsersParams = {
  page?: number;
  limit?: number;
  role?: UserRole;
  search?: string;
};

export const listUsers = async (params: ListUsersParams = {}) => {
  const { role, search } = params;
  const pagination = resolvePagination({ page: params.page, limit: params.limit });
  const conditions: string[] = [];
  const values: Array<string | number> = [];

  if (role) {
    conditions.push(`role = $${values.length + 1}`);
    values.push(userRoleEnum.parse(role));
  }

  if (search) {
    const index = values.length + 1;
    conditions.push(`(email ILIKE $${index} OR first_name ILIKE $${index} OR last_name ILIKE $${index})`);
    values.push(`%${search}%`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const pool = getPool();

  const dataQuery = `
    SELECT *
    FROM users
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2}
  `;

  const countQuery = `
    SELECT COUNT(*)::int AS count
    FROM users
    ${whereClause}
  `;

  const dataValues = [...values, pagination.limit, pagination.offset];
  const [dataResult, countResult] = await Promise.all([
    pool.query(dataQuery, dataValues),
    pool.query(countQuery, values),
  ]);

  const users = dataResult.rows.map(mapPublicUserRow);
  const total = countResult.rows[0]?.count ?? 0;

  return buildPaginatedResponse(users, total, pagination);
};

export const getUser = async (id: string): Promise<PublicUser> => {
  const pool = getPool();
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

  if (rows.length === 0) {
    throw new AppError('User not found', 404);
  }

  return mapPublicUserRow(rows[0]);
};

export const updateUser = async (id: string, input: UpdateUserInput): Promise<PublicUser> =>
  updateUserCredentials(id, input);

export const deleteUser = async (id: string): Promise<void> => {
  const pool = getPool();
  const { rowCount } = await pool.query('DELETE FROM users WHERE id = $1', [id]);

  if (rowCount === 0) {
    throw new AppError('User not found', 404);
  }
};
