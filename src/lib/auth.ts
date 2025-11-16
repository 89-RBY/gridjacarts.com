import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'gridjacarts-secret-key-change-in-production';

// In production, use a real database. This is for demo purposes.
const users: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'admin@gridjacarts.com',
    name: 'Admin',
    role: 'admin',
    password: '$2a$10$rHxJvEuUMeL4h3LzKTqvqeYG5fRVFQNVHGpUqN8VXdqSN3GxHNE2e', // "admin123"
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'partner@example.com',
    name: 'Partner Demo',
    role: 'partner',
    password: '$2a$10$rHxJvEuUMeL4h3LzKTqvqeYG5fRVFQNVHGpUqN8VXdqSN3GxHNE2e', // "admin123"
    createdAt: new Date().toISOString(),
  },
];

export async function verifyCredentials(email: string, password: string): Promise<User | null> {
  const user = users.find((u) => u.email === email);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export function createToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as User;
    return decoded;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) return null;

  return verifyToken(token);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
