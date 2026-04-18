/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from '@/services/config/api-client';

export const userService = {
  // Create User
  create: async (data: any) => {
    const res = await apiClient.post('/auth/register', data);
    return res.data;
  },

  // Get All Users with Pagination/Search/Filter
  getAll: async (params?: any) => {
    const res = await apiClient.get('/users', { params });
    return res.data;
  },

  // Get User Dashboard Summary
  getSummary: async () => {
    const res = await apiClient.get('/users/user-dashboard/summary');
    return res.data;
  },

  // Get Current Logged-in User
  getMe: async () => {
    const res = await apiClient.get('/users/me');
    return res.data;
  },

  // Update Specific User
  update: async (id: string, data: any) => {
    const res = await apiClient.patch(`/users/${id}`, data);
    return res.data;
  },

  // Update My Avatar
  updateAvatar: async (data: any) => {
    const res = await apiClient.patch('/users/me/avatar', data);
    return res.data;
  },

  // Delete User (Soft Delete)
  delete: async (id: string) => {
    const res = await apiClient.delete(`/users/${id}`);
    return res.data;
  },

  // Restore Deleted User
  restore: async (id: string) => {
    const res = await apiClient.post(`/users/${id}/restore`);
    return res.data;
  },

  // Get/Create Conversation ID for Chat
  getConversationId: async (recipientId: string) => {
    const res = await apiClient.post(`/private-chat/create-conversationid/${recipientId}`);
    return res.data;
  },
};
