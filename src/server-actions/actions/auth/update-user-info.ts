/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { cookies } from 'next/headers';

export async function updateUserInfoCookie(userInfo: Record<string, any>) {
  const cookieStore = await cookies();
  cookieStore.set('userInfo', JSON.stringify(userInfo));
}
