import { Router, Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getPool } from '../db';

const router = Router();

// Require JWT_SECRET - fail fast if not configured
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('SECURITY ERROR: JWT_SECRET environment variable is required. Application cannot start without it.');
}

const JWT_EXPIRES_IN = '7d';

type UserRow = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  created_at: string;
};

type ResolvedNames = {
  firstName: string;
  lastName: string;
  fullName: string;
};

const toTrimmedOrUndefined = (value: unknown): string | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
};

const resolveNames = (body: Request['body']): ResolvedNames | null => {
  const providedFirst = toTrimmedOrUndefined(body?.firstName);
  const providedLast = toTrimmedOrUndefined(body?.lastName);
  const providedFull = toTrimmedOrUndefined(body?.name);

  let firstName = providedFirst;
  let lastName = providedLast;

  if ((!firstName || !lastName) && providedFull) {
    const parts = providedFull.split(/\s+/).filter(Boolean);

    if (parts.length >= 2) {
      firstName = firstName ?? parts[0];
      lastName = lastName ?? parts.slice(1).join(' ');
    }
  }

  if (!firstName || !lastName) {
    return null;
  }

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`.replace(/\s+/g, ' ').trim(),
  };
};

const buildUserResponse = (row: UserRow) => {
  const firstName = row.first_name.trim();
  const lastName = row.last_name.trim();
  const fullName = `${firstName} ${lastName}`.replace(/\s+/g, ' ').trim();

  return {
    id: row.id,
    email: row.email,
    firstName,
    lastName,
    name: fullName,
    role: row.role,
    createdAt: row.created_at,
  };
};

// Middleware to verify JWT
export const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    if (!decoded || typeof decoded === 'string') {
      return res.status(403).json({ error: 'Invalid token payload' });
    }

    const payload = decoded as JwtPayload & {
      userId?: number | string;
      email?: string;
      role?: string;
      firstName?: string;
      lastName?: string;
      name?: string;
    };

    const rawUserId = payload.userId;
    const userId = typeof rawUserId === 'string' ? Number(rawUserId) : rawUserId;

    if (typeof userId !== 'number' || Number.isNaN(userId) || !payload.email || !payload.role) {
      return res.status(403).json({ error: 'Invalid token payload' });
    }

    const firstName = toTrimmedOrUndefined(payload.firstName);
    const lastName = toTrimmedOrUndefined(payload.lastName);
    const fullNameFromToken = toTrimmedOrUndefined(payload.name);
    const combinedName = [firstName, lastName].filter(Boolean).join(' ').trim();
    const derivedName = fullNameFromToken ?? (combinedName ? combinedName : undefined);

    req.user = {
      ...payload,
      userId,
      email: payload.email,
      role: payload.role,
      ...(firstName ? { firstName } : {}),
      ...(lastName ? { lastName } : {}),
      ...(derivedName ? { name: derivedName } : {}),
    };

    next();
  });
};

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = toTrimmedOrUndefined(email)?.toLowerCase();
    if (!normalizedEmail) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    const names = resolveNames(req.body);
    if (!names) {
      return res.status(400).json({ error: 'First name and last name are required' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Check if user exists
    const existingUser = await getPool().query(
      'SELECT id FROM users WHERE email = $1',
      [normalizedEmail]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await getPool().query(
      `INSERT INTO users (email, password_hash, first_name, last_name, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, first_name, last_name, role, created_at`,
      [normalizedEmail, hashedPassword, names.firstName, names.lastName, 'student']
    );

    const user = buildUserResponse(result.rows[0] as UserRow);

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      token,
      user: {
        ...user,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing credentials' });
    }

    // Find user
    const normalizedEmail = toTrimmedOrUndefined(email)?.toLowerCase();
    if (!normalizedEmail) {
      return res.status(400).json({ error: 'Missing credentials' });
    }

    const result = await getPool().query(
      'SELECT id, email, password_hash, first_name, last_name, role, created_at FROM users WHERE email = $1',
      [normalizedEmail]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const row = result.rows[0] as UserRow & { password_hash: string };

    // Verify password
    const valid = await bcrypt.compare(password, row.password_hash);

    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const user = buildUserResponse(row);
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      token,
      user: {
        ...user,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET /api/auth/me - Get current user
router.get('/me', authenticateToken, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const result = await getPool().query(
      'SELECT id, email, first_name, last_name, role, created_at FROM users WHERE id = $1',
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch user's enrollments
    const enrollments = await getPool().query(
      `SELECT e.id, e.course_id, e.enrollment_date, e.completion_date, e.progress_percentage, e.status,
              c.title as course_title, c.description as course_description
       FROM enrollments e
       JOIN courses c ON e.course_id = c.id
       WHERE e.user_id = $1 AND e.status = 'active'
       ORDER BY e.enrollment_date DESC`,
      [req.user.userId]
    );

    res.json({
      user: buildUserResponse(result.rows[0] as UserRow),
      enrollments: enrollments.rows
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const normalizedEmail = toTrimmedOrUndefined(email)?.toLowerCase();
    if (!normalizedEmail) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Check if user exists
    const result = await getPool().query(
      'SELECT id, email FROM users WHERE email = $1',
      [normalizedEmail]
    );

    // Always return success to prevent email enumeration
    if (result.rows.length === 0) {
      return res.json({
        message: 'If an account exists with that email, password reset instructions have been sent.',
        success: true
      });
    }

    const user = result.rows[0];

    // Generate reset token (valid for 1 hour)
    const resetToken = jwt.sign(
      { userId: user.id, email: user.email, type: 'password-reset' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Store reset token in database (you'll need to add a migration for this)
    await getPool().query(
      `INSERT INTO password_reset_tokens (user_id, token, expires_at)
       VALUES ($1, $2, NOW() + INTERVAL '1 hour')
       ON CONFLICT (user_id)
       DO UPDATE SET token = $2, expires_at = NOW() + INTERVAL '1 hour', created_at = NOW()`,
      [user.id, resetToken]
    );

    // In production, send email here
    // For now, return the token (admin can send it manually)
    res.json({
      message: 'If an account exists with that email, password reset instructions have been sent.',
      success: true,
      // Remove this in production after email is configured
      resetToken: resetToken,
      resetUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process password reset request' });
  }
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: 'Token and new password are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { userId: number; email: string; type: string };
    } catch (err) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    if (decoded.type !== 'password-reset') {
      return res.status(400).json({ error: 'Invalid reset token' });
    }

    // Check if token exists in database and hasn't been used
    const tokenResult = await getPool().query(
      'SELECT user_id, used_at FROM password_reset_tokens WHERE user_id = $1 AND token = $2 AND expires_at > NOW()',
      [decoded.userId, token]
    );

    if (tokenResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    if (tokenResult.rows[0].used_at) {
      return res.status(400).json({ error: 'Reset token has already been used' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    await getPool().query(
      'UPDATE users SET password_hash = $1 WHERE id = $2',
      [hashedPassword, decoded.userId]
    );

    // Mark token as used
    await getPool().query(
      'UPDATE password_reset_tokens SET used_at = NOW() WHERE user_id = $1 AND token = $2',
      [decoded.userId, token]
    );

    res.json({
      message: 'Password has been reset successfully',
      success: true
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

export default router;
