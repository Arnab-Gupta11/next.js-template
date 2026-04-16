'use server';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

// Get a new access token using the refresh token
export const getNewToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const baseApi = process.env.NEXT_PUBLIC_BASE_API;

  if (!refreshToken) return null;

  try {
    const res = await fetch(`${baseApi}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return null;
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Refresh Token Error:', error);
    return null;
  }
};

// Check if the token is expired
export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;
  try {
    const decoded: { exp: number } = jwtDecode(token);
    return decoded.exp * 1000 - 60000 < Date.now();
  } catch {
    return true;
  }
};

// Get the valid token (refresh if expired)
export const getValidToken = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  let token = cookieStore.get('accessToken')?.value;

  if (!token || (await isTokenExpired(token))) {
    console.log('Token expired or missing, refreshing...');
    const res = await getNewToken();

    if (res?.data?.accessToken) {
      token = res.data.accessToken;
      cookieStore.set('accessToken', token as string);
      if (res.data.refreshToken) {
        cookieStore.set('refreshToken', res.data.refreshToken as string);
      }
      return token!;
    } else {
      return null;
    }
  }

  return token;
};
