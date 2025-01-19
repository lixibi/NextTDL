import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const code = process.env.CODE;

    // 如果没有设置密码，则允许访问
    if (!code) {
      return NextResponse.json({ success: true });
    }

    // 验证密码
    if (password === code) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
} 