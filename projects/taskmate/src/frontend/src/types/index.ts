// TaskMate TypeScript Types
// Centralized type definitions for better code organization

export interface Task {
  id: number;
  title: string;
  description?: string;
  deadline?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
  read: boolean;
}

export interface Mission {
  id: number;
  title: string;
  description: string;
  deadline?: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  created_at: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ChatRequest {
  message: string;
  chatHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export interface TaskExtractionRequest {
  message: string;
}

export interface TaskExtractionResponse {
  success: boolean;
  tasks: Task[];
  message: string;
} 