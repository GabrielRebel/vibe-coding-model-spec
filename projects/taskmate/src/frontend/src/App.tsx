import React, { useState, useEffect } from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface';
import TaskSidebar from './components/TaskSidebar';
import NotificationPanel from './components/NotificationPanel';
import MissionPanel from './components/MissionPanel';

interface Task {
  id: number;
  title: string;
  description?: string;
  deadline?: string;
  completed: boolean;
  priority: string;
  created_at: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [missions, setMissions] = useState<any[]>([]);
  const [activePanel, setActivePanel] = useState<'tasks' | 'missions'>('tasks');

  // Load initial data
  useEffect(() => {
    fetchTasks();
    fetchMissions();
    checkNotifications();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const fetchMissions = async () => {
    try {
      const response = await fetch('/api/missions');
      const data = await response.json();
      if (data.success) {
        setMissions(data.missions);
      }
    } catch (error) {
      console.error('Failed to fetch missions:', error);
    }
  };

  const checkNotifications = async () => {
    try {
      const response = await fetch('/api/notifications/check', {
        method: 'POST'
      });
      const data = await response.json();
      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.error('Failed to check notifications:', error);
    }
  };

  const handleSendMessage = async (message: string) => {
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
      const chatResponse = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          chatHistory: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });
      const chatData = await chatResponse.json();

      if (chatData.success) {
        // Add AI response to chat
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: chatData.response,
          timestamp: chatData.timestamp
        };
        setMessages(prev => [...prev, aiMessage]);
      }

      // Extract tasks from message (TASK-02)
      const taskResponse = await fetch('/api/tasks/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const taskData = await taskResponse.json();

      if (taskData.success && taskData.tasks.length > 0) {
        // Refresh tasks list
        fetchTasks();
      }

    } catch (error) {
      console.error('Failed to process message:', error);
    }
  };

  const handleTaskComplete = async (taskId: number) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/complete`, {
        method: 'PUT'
      });
      if (response.ok) {
        fetchTasks(); // Refresh tasks
      }
    } catch (error) {
      console.error('Failed to complete task:', error);
    }
  };

  return (
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
    </div>
  );
}

export default App; 