import { getValidToken } from '@/server-actions/config/token-handler';
import axios, { InternalAxiosRequestConfig } from './../../../node_modules/axios/index.d';
interface ICustomAxiosConfig extends InternalAxiosRequestConfig {
  _skipInterceptor?: boolean;
  _retry?: boolean;
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

let tokenPromise: Promise<string | null> | null = null;

// ==========================================
//  Request Interceptor
// =========================================

apiClient.interceptors.request.use(async (config: ICustomAxiosConfig) => {
  if (config._skipInterceptor) {
    return config;
  }
  if (!tokenPromise) {
    tokenPromise = getValidToken().finally(() => {
      tokenPromise = null;
    });
  }
  return config;
});
