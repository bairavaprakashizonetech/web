import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';

const TaskModal = ({ isOpen, onClose, onSave, taskToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      setPriority(taskToEdit.priority || 'medium');
      if (taskToEdit.due_date) {
        // Format ISO date string to YYYY-MM-DD for date input
        const d = new Date(taskToEdit.due_date);
        const isoString = d.toISOString().split('T')[0];
        setDueDate(isoString);
      } else {
        setDueDate('');
      }
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      description: description.trim() || null,
      priority,
      due_date: dueDate ? new Date(dueDate).toISOString() : null,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {taskToEdit ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button className="close-btn" onClick={onClose} id="btn-close-modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="task-title-input">Title *</label>
            <input
              id="task-title-input"
              type="text"
              className="form-input"
              placeholder="e.g. Finish FastAPI & React production build"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="task-desc-input">Description</label>
            <textarea
              id="task-desc-input"
              className="form-textarea"
              rows={3}
              placeholder="Add optional task details or notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="task-priority-input">Priority</label>
              <select
                id="task-priority-input"
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="task-duedate-input">Due Date</label>
              <input
                id="task-duedate-input"
                type="date"
                className="form-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
              id="btn-cancel-task"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              id="btn-submit-task"
            >
              {taskToEdit ? <Save size={18} /> : <Plus size={18} />}
              <span>{taskToEdit ? 'Save Changes' : 'Create Task'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
