import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, createToken, getUsers } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    console.log('Login attempt:', { email, passwordLength: password?.length, password });

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Debug: show all users
    const allUsers = await getUsers();
    console.log('Available users:', allUsers.map(u => ({ email: u.email, role: u.role, passwordHash: u.password })));

    const user = await verifyCredentials(email, password);
    console.log('Verification result:', user ? 'SUCCESS' : 'FAILED');

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = createToken(user);

    const response = NextResponse.json({
      user,
      message: 'Login successful',
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
