'use server';

import { cookies } from 'next/headers';

export async function getUserInfoFromCookie() {
  const cookieStore = await cookies();
  const raw = cookieStore.get('userInfo')?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
