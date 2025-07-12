import React, { useState, useRef, useEffect } from 'react';
import './ChatInterface.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    setIsLoading(true);
    await onSendMessage(inputMessage.trim());
    setInputMessage('');
    setIsLoading(false);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="chat-interface">
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <h3>Welcome to TaskMate! 👋</h3>
            <p>I'm your AI co-pilot for productivity. Just chat naturally and I'll help you:</p>
            <ul>
              <li>Extract tasks and deadlines from our conversation</li>
              <li>Create missions to break down big goals</li>
              <li>Send you timely reminders</li>
            </ul>
            <p>Try saying: "I need to finish the quarterly report by Friday"</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.role === 'user' ? 'user' : 'assistant'}`}
          >
            <div className="message-content">
              <div className="message-text">{message.content}</div>
              <div className="message-time">{formatTime(message.timestamp)}</div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message assistant">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message here..."
          disabled={isLoading}
          className="chat-input"
        />
        <button 
          type="submit" 
          disabled={!inputMessage.trim() || isLoading}
          className="send-button"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ChatInterface; 