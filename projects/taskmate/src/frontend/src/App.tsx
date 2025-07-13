import React, { useState, useEffect } from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface';
import TaskSidebar from './components/TaskSidebar';
import NotificationPanel from './components/NotificationPanel';
import MissionPanel from './components/MissionPanel';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import Toast from './components/Toast';
import { Task, Message, Notification } from './types';
import { chatApi, tasksApi, missionsApi, notificationsApi, ApiError } from './utils/api';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [missions, setMissions] = useState<any[]>([]);
  const [activePanel, setActivePanel] = useState<'tasks' | 'missions'>('tasks');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>({ show: false, message: '', type: 'info' });

  // Load initial data
  useEffect(() => {
    fetchTasks();
    fetchMissions();
    checkNotifications();
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'info' });
  };

  const fetchTasks = async () => {
    try {
      const data = await tasksApi.getAll();
      if (data.success) {
        setTasks(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      if (error instanceof ApiError) {
        showToast(`Failed to load tasks: ${error.message}`, 'error');
      }
    }
  };

  const fetchMissions = async () => {
    try {
      const data = await missionsApi.getAll();
      if (data.success) {
        setMissions(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch missions:', error);
      if (error instanceof ApiError) {
        showToast(`Failed to load missions: ${error.message}`, 'error');
      }
    }
  };

  const checkNotifications = async () => {
    try {
      const data = await notificationsApi.check();
      if (data.success) {
        setNotifications(data.data || []);
      }
    } catch (error) {
      console.error('Failed to check notifications:', error);
      if (error instanceof ApiError) {
        showToast(`Failed to check notifications: ${error.message}`, 'error');
      }
    }
  };

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Send to chat API (CHAT-01)
      const chatData = await chatApi.sendMessage({
        message,
        chatHistory: messages.map(m => ({ role: m.role, content: m.content }))
      });

      if (chatData.success) {
        // Add AI response to chat
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: chatData.data?.response || chatData.message || 'Sorry, I couldn\'t process that.',
          timestamp: chatData.data?.timestamp || new Date().toISOString()
        };
        setMessages(prev => [...prev, aiMessage]);
      }

      // Extract tasks from message (TASK-02)
      const taskData = await tasksApi.extract({ message });

      if (taskData.success && taskData.data?.length > 0) {
        showToast(`Extracted ${taskData.data.length} task(s) from your message!`, 'success');
        fetchTasks(); // Refresh tasks list
      }

    } catch (error) {
      console.error('Failed to process message:', error);
      if (error instanceof ApiError) {
        showToast(`Failed to process message: ${error.message}`, 'error');
      } else {
        showToast('Failed to process message. Please try again.', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskComplete = async (taskId: number) => {
    try {
      const data = await tasksApi.complete(taskId);
      if (data.success) {
        showToast('Task completed successfully!', 'success');
        fetchTasks(); // Refresh tasks
      }
    } catch (error) {
      console.error('Failed to complete task:', error);
      if (error instanceof ApiError) {
        showToast(`Failed to complete task: ${error.message}`, 'error');
      } else {
        showToast('Failed to complete task. Please try again.', 'error');
      }
    }
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <header className="App-header">
          <h1>TaskMate</h1>
          <p>Your AI co-pilot for mission-driven productivity</p>
        </header>
        
        <main className="App-main">
          <div className="chat-container">
            <ChatInterface 
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
          
          <div className="sidebar">
            <div className="sidebar-tabs">
              <button 
                className={activePanel === 'tasks' ? 'active' : ''}
                onClick={() => setActivePanel('tasks')}
              >
                Tasks
              </button>
              <button 
                className={activePanel === 'missions' ? 'active' : ''}
                onClick={() => setActivePanel('missions')}
              >
                Missions
              </button>
            </div>
            
            {activePanel === 'tasks' && (
              <TaskSidebar 
                tasks={tasks}
                onTaskComplete={handleTaskComplete}
              />
            )}
            
            {activePanel === 'missions' && (
              <MissionPanel 
                missions={missions}
                onMissionUpdate={fetchMissions}
              />
            )}
          </div>
        </main>
        
        {notifications.length > 0 && (
          <NotificationPanel 
            notifications={notifications}
            onDismiss={checkNotifications}
          />
        )}

        <Toast
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App; 