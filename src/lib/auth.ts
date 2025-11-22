import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import { User } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'gridjacarts-secret-key-change-in-production';

// User management with Prisma
export async function getUsers(): Promise<Array<User & { password: string }>> {
  const users = await prisma.user.findMany();

  // If no users exist, create default admin
  if (users.length === 0) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const defaultUser = await prisma.user.create({
      data: {
        email: 'admin@gridjacarts.com',
        name: 'Admin',
        role: 'admin',
        password: hashedPassword,
      },
    });
    return [
      {
        id: defaultUser.id,
        email: defaultUser.email,
        name: defaultUser.name,
        role: defaultUser.role as 'admin' | 'partner',
        password: defaultUser.password,
        createdAt: defaultUser.createdAt.toISOString(),
      },
    ];
  }

  return users.map((u: typeof users[0]) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role as 'admin' | 'partner',
    password: u.password,
    createdAt: u.createdAt.toISOString(),
  }));
}

export async function createUser(userData: {
  email: string;
  name: string;
  password: string;
  role: 'admin' | 'partner';
}): Promise<User> {
  const hashedPassword = await hashPassword(userData.password);
  const newUser = await prisma.user.create({
    data: {
      email: userData.email,
      name: userData.name,
      role: userData.role,
      password: hashedPassword,
    },
  });

  return {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    role: newUser.role as 'admin' | 'partner',
    createdAt: newUser.createdAt.toISOString(),
  };
}

export async function updateUser(
  id: string,
  updates: Partial<{ email: string; name: string; password: string; role: 'admin' | 'partner' }>
): Promise<User | null> {
  const updateData: Record<string, string> = {};

  if (updates.email) updateData.email = updates.email;
  if (updates.name) updateData.name = updates.name;
  if (updates.role) updateData.role = updates.role;
  if (updates.password) updateData.password = await hashPassword(updates.password);

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role as 'admin' | 'partner',
      createdAt: updatedUser.createdAt.toISOString(),
    };
  } catch {
    return null;
  }
}

export async function deleteUser(id: string): Promise<boolean> {
  try {
    await prisma.user.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

export async function getUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as 'admin' | 'partner',
    createdAt: user.createdAt.toISOString(),
  };
}

export async function verifyCredentials(email: string, password: string): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as 'admin' | 'partner',
    createdAt: user.createdAt.toISOString(),
  };
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
