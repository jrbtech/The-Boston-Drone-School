import bcrypt from 'bcryptjs';

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

export const verifyPassword = (password: string, hash: string): Promise<boolean> =>
  bcrypt.compare(password, hash);
