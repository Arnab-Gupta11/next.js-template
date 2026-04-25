import { getValidToken } from '@/server-actions/config/token-handler';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
interface ICustomAxiosConfig extends InternalAxiosRequestConfig {
  _skipInterceptor?: boolean;
  _retry?: boolean;
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

let tokenPromise: Promise<string | null> | null = null;

// ==========================================
//  Request Interceptor
// =========================================

apiClient.interceptors.request.use(
  // onFulfilled
  async (config: ICustomAxiosConfig) => {
    if (config._skipInterceptor) {
      return config;
    }
    if (!tokenPromise) {
      tokenPromise = getValidToken().finally(() => {
        tokenPromise = null;
      });
    }

    const token = await tokenPromise;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  // onRejected
  (error) => {
    return Promise.reject(error);
  },
);

// ==========================================
//  Response Interceptor
// =========================================

apiClient.interceptors.response.use(
  //onSuccess
  (response) => {
    return response;
  },

  //onError
  async (error: AxiosError) => {
    const originalRequest = error.config as ICustomAxiosConfig;
    if (
      error.response?.status === 401 &&
      !originalRequest._skipInterceptor &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const token = await getValidToken();

        if (!token) {
          throw new Error('Unable to refresh token');
        }
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.log('Token refresh failed:', refreshError);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('session-expired'));
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
