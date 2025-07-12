import React from 'react';

interface NotificationPanelProps {
  notifications: any[];
  onDismiss: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications, onDismiss }) => {
  return (
    <div className="notification-panel">
      {notifications.map((notification) => (
        <div key={notification.id} className="notification-item">
          <p>{notification.message}</p>
          <button onClick={onDismiss}>Dismiss</button>
        </div>
      ))}
    </div>
  );
};

export default NotificationPanel; 