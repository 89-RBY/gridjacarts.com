import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { promises as fs } from 'fs';
import path from 'path';
import { User } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'gridjacarts-secret-key-change-in-production';
const DATA_DIR = path.join(process.cwd(), 'data');

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// User management with file storage
export async function getUsers(): Promise<Array<User & { password: string }>> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(path.join(DATA_DIR, 'users.json'), 'utf-8');
    return JSON.parse(data);
  } catch (readError) {
    console.log('Users file not found, creating default user...', readError);
    // Default users - generate fresh hash
    const hashedPassword = await bcrypt.hash('admin123', 10);
    console.log('Generated hash for admin123');
    const defaultUsers = [
      {
        id: '1',
        email: 'admin@gridjacarts.com',
        name: 'Admin',
        role: 'admin' as const,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      },
    ];
    try {
      await saveUsers(defaultUsers);
      console.log('Successfully saved default users');
    } catch (saveError) {
      console.error('Failed to save users:', saveError);
    }
    return defaultUsers;
  }
}

export async function saveUsers(users: Array<User & { password: string }>): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(path.join(DATA_DIR, 'users.json'), JSON.stringify(users, null, 2));
}

export async function createUser(userData: {
  email: string;
  name: string;
  password: string;
  role: 'admin' | 'partner';
}): Promise<User> {
  const users = await getUsers();

  // Check if email already exists
  if (users.find((u) => u.email === userData.email)) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await hashPassword(userData.password);
  const newUser = {
    id: Date.now().toString(),
    email: userData.email,
    name: userData.name,
    role: userData.role,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await saveUsers(users);

  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

export async function updateUser(
  id: string,
  updates: Partial<{ email: string; name: string; password: string; role: 'admin' | 'partner' }>
): Promise<User | null> {
  const users = await getUsers();
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) return null;

  if (updates.email && updates.email !== users[index].email) {
    if (users.find((u) => u.email === updates.email)) {
      throw new Error('Email already exists');
    }
    users[index].email = updates.email;
  }

  if (updates.name) users[index].name = updates.name;
  if (updates.role) users[index].role = updates.role;
  if (updates.password) {
    users[index].password = await hashPassword(updates.password);
  }

  await saveUsers(users);

  const { password: _, ...userWithoutPassword } = users[index];
  return userWithoutPassword;
}

export async function deleteUser(id: string): Promise<boolean> {
  const users = await getUsers();
  const filteredUsers = users.filter((u) => u.id !== id);

  if (users.length === filteredUsers.length) return false;

  await saveUsers(filteredUsers);
  return true;
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await getUsers();
  const user = users.find((u) => u.id === id);
  if (!user) return null;

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function verifyCredentials(email: string, password: string): Promise<User | null> {
  const users = await getUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return null;

  console.log('Comparing password:', password, 'against hash:', user.password);
  const isValid = await bcrypt.compare(password, user.password);
  console.log('bcrypt.compare result:', isValid);
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
