// TaskMate API Utilities
// Centralized API handling with error management and type safety

import { ApiResponse, ChatRequest, TaskExtractionRequest } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic API request function with error handling
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || `HTTP ${response.status}`,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ApiError(
      'Network error - please check your connection',
      0,
      error
    );
  }
}

// Chat API functions
export const chatApi = {
  sendMessage: async (request: ChatRequest): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>('/chat/message', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  getHistory: async (): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>('/chat/history');
  },

  getProviders: async (): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>('/chat/providers');
  },
};

// Tasks API functions
export const tasksApi = {
  getAll: async (): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>('/tasks');
  },

  extract: async (request: TaskExtractionRequest): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>('/tasks/extract', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  complete: async (taskId: number): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/tasks/${taskId}/complete`, {
      method: 'PUT',
    });
  },

  delete: async (taskId: number): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/tasks/${taskId}`, {
      method: 'DELETE',
    });
  },
};

// Missions API functions
export const missionsApi = {
  getAll: async (): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>('/missions');
  },

  create: async (mission: any): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>('/missions', {
      method: 'POST',
      body: JSON.stringify(mission),
    });
  },

  update: async (missionId: number, updates: any): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/missions/${missionId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },
};

// Notifications API functions
export const notificationsApi = {
  check: async (): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>('/notifications/check', {
      method: 'POST',
    });
  },

  markRead: async (notificationId: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  },
};

export { ApiError }; 