import React from 'react';
import './TaskSidebar.css';

interface Task {
  id: number;
  title: string;
  description?: string;
  deadline?: string;
  completed: boolean;
  priority: string;
  created_at: string;
}

interface TaskSidebarProps {
  tasks: Task[];
  onTaskComplete: (taskId: number) => void;
}

const TaskSidebar: React.FC<TaskSidebarProps> = ({ tasks, onTaskComplete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="task-sidebar">
      <div className="task-section">
        <h3>Pending Tasks ({pendingTasks.length})</h3>
        {pendingTasks.length === 0 ? (
          <p className="no-tasks">No pending tasks. Start chatting to create some!</p>
        ) : (
          <div className="task-list">
            {pendingTasks.map((task) => (
              <div key={task.id} className="task-item">
                <div className="task-header">
                  <h4 className="task-title">{task.title}</h4>
                  <span 
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                  >
                    {task.priority}
                  </span>
                </div>
                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}
                {task.deadline && (
                  <p className="task-deadline">
                    Due: {formatDate(task.deadline)}
                  </p>
                )}
                <button
                  onClick={() => onTaskComplete(task.id)}
                  className="complete-button"
                >
                  Mark Complete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {completedTasks.length > 0 && (
        <div className="task-section">
          <h3>Completed ({completedTasks.length})</h3>
          <div className="task-list completed">
            {completedTasks.map((task) => (
              <div key={task.id} className="task-item completed">
                <div className="task-header">
                  <h4 className="task-title">{task.title}</h4>
                  <span className="completed-badge">✓</span>
                </div>
                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskSidebar; 