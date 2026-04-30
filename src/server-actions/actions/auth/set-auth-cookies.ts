/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { cookies } from 'next/headers';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  userInfo: Record<string, any>;
}

export async function setAuthCookies({ accessToken, refreshToken, userInfo }: AuthTokens) {
  const cookieStore = await cookies();

  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    // sameSite: 'strict',
    // maxAge: 60 * 15, // 15 minutes
    path: '/',
  });

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    // sameSite: 'strict',
    // maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  cookieStore.set('userInfo', JSON.stringify(userInfo));
}
