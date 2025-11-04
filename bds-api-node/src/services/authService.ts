import { PoolClient } from 'pg';

import { getPool } from '../db';
import { CreateUserInput, PublicUser, UpdateUserInput, userRoleEnum } from '../models/user';
import { AppError } from '../utils/errors';
import { hashPassword, verifyPassword } from '../utils/password';
import { signToken } from '../utils/token';
import { mapPublicUserRow, mapUserRow } from '../utils/mappers';

type AuthResult = {
  user: PublicUser;
  token: string;
};

const DUPLICATE_KEY_ERROR = '23505';

const insertUser = async (client: PoolClient, input: CreateUserInput): Promise<PublicUser> => {
  const role = userRoleEnum.parse(input.role ?? 'student');
  const hashedPassword = await hashPassword(input.password);

  const { rows } = await client.query(
    `
      INSERT INTO users (email, password_hash, first_name, last_name, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
    [input.email, hashedPassword, input.firstName, input.lastName, role]
  );

  return mapPublicUserRow(rows[0]);
};

export const registerUser = async (input: CreateUserInput): Promise<AuthResult> => {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const user = await insertUser(client, input);
    await client.query('COMMIT');

    const token = signToken({ userId: user.id, role: user.role });
    return { user, token };
  } catch (error: any) {
    await client.query('ROLLBACK');

    if (error?.code === DUPLICATE_KEY_ERROR) {
      throw new AppError('Email is already registered', 409);
    }

    throw error;
  } finally {
    client.release();
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResult> => {
  const pool = getPool();
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

  if (rows.length === 0) {
    throw new AppError('Invalid email or password', 401);
  }

  const userRow = rows[0];
  const isValid = await verifyPassword(password, userRow.password_hash);

  if (!isValid) {
    throw new AppError('Invalid email or password', 401);
  }

  const user = mapUserRow(userRow);
  const publicUser = mapPublicUserRow(userRow);
  const token = signToken({ userId: user.id, role: user.role });

  return { user: publicUser, token };
};

export const getUserById = async (id: string): Promise<PublicUser> => {
  const pool = getPool();
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

  if (rows.length === 0) {
    throw new AppError('User not found', 404);
  }

  return mapPublicUserRow(rows[0]);
};

export const updateUserCredentials = async (id: string, input: UpdateUserInput): Promise<PublicUser> => {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const existing = await client.query('SELECT * FROM users WHERE id = $1', [id]);

    if (existing.rowCount === 0) {
      throw new AppError('User not found', 404);
    }

    const updates: string[] = [];
    const values: Array<string | null> = [];
    let index = 1;

    if (input.email) {
      updates.push(`email = $${index++}`);
      values.push(input.email);
    }

    if (input.firstName) {
      updates.push(`first_name = $${index++}`);
      values.push(input.firstName);
    }

    if (input.lastName) {
      updates.push(`last_name = $${index++}`);
      values.push(input.lastName);
    }

    if (input.role) {
      updates.push(`role = $${index++}`);
      values.push(userRoleEnum.parse(input.role));
    }

    if (input.password) {
      updates.push(`password_hash = $${index++}`);
      const hashedPassword = await hashPassword(input.password);
      values.push(hashedPassword);
    }

    if (updates.length === 0) {
      await client.query('ROLLBACK');
      return mapPublicUserRow(existing.rows[0]);
    }

    values.push(id);
    const updateQuery = `
      UPDATE users
      SET ${updates.join(', ')}
      WHERE id = $${index}
      RETURNING *
    `;

    const { rows } = await client.query(updateQuery, values);
    await client.query('COMMIT');
    return mapPublicUserRow(rows[0]);
  } catch (error: any) {
    await client.query('ROLLBACK');

    if (error?.code === DUPLICATE_KEY_ERROR) {
      throw new AppError('Email is already registered', 409);
    }

    throw error;
  } finally {
    client.release();
  }
};
