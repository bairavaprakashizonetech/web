import React from 'react';
import { Check, Calendar, Edit3, Trash2, AlertCircle } from 'lucide-react';

const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`task-card priority-${task.priority} ${task.completed ? 'completed' : ''}`}>
      <div className="task-left">
        <div 
          className={`checkbox-custom ${task.completed ? 'checked' : ''}`}
          onClick={() => onToggle(task.id)}
          title={task.completed ? 'Mark incomplete' : 'Mark completed'}
          id={`task-toggle-${task.id}`}
        >
          {task.completed && <Check size={14} />}
        </div>
        
        <div className="task-content">
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-desc">{task.description}</p>
          )}
          
          <div className="task-meta">
            <span className={`badge badge-${task.priority}`}>
              {task.priority === 'high' && <AlertCircle size={12} />}
              {task.priority}
            </span>

            {task.due_date && (
              <span className="date-badge">
                <Calendar size={13} />
                {formatDate(task.due_date)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button 
          className="btn btn-secondary btn-icon"
          onClick={() => onEdit(task)}
          title="Edit task"
          id={`btn-edit-task-${task.id}`}
        >
          <Edit3 size={16} />
        </button>
        
        <button 
          className="btn btn-danger-ghost btn-icon"
          onClick={() => onDelete(task.id)}
          title="Delete task"
          id={`btn-delete-task-${task.id}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
