import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsOverview from './components/StatsOverview';
import TaskFilter from './components/TaskFilter';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';
import taskApi from './api/taskApi';
import { CheckCircle2, AlertCircle, Inbox, Loader2 } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, high_priority: 0 });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  
  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_desc');
  
  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchTasksAndStats = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        sort_by: sortBy,
      };
      if (search) params.search = search;
      if (statusFilter !== 'all') params.status = statusFilter;
      if (priorityFilter !== 'all') params.priority = priorityFilter;

      const [tasksData, statsData] = await Promise.all([
        taskApi.getTasks(params),
        taskApi.getStats()
      ]);

      setTasks(tasksData);
      setStats(statsData);
    } catch (err) {
      console.error('Failed to load tasks:', err);
      showToast('Failed to connect to backend server', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, priorityFilter, sortBy]);

  useEffect(() => {
    fetchTasksAndStats();
  }, [fetchTasksAndStats]);

  const handleOpenModal = (task = null) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(false);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (taskToEdit) {
        await taskApi.updateTask(taskToEdit.id, taskData);
        showToast('Task updated successfully!');
      } else {
        await taskApi.createTask(taskData);
        showToast('New task created!');
      }
      handleCloseModal();
      fetchTasksAndStats();
    } catch (err) {
      console.error('Save failed:', err);
      showToast('Failed to save task', 'error');
    }
  };

  const handleToggleTask = async (id) => {
    try {
      await taskApi.toggleTask(id);
      fetchTasksAndStats();
    } catch (err) {
      console.error('Toggle failed:', err);
      showToast('Failed to update completion state', 'error');
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await taskApi.deleteTask(id);
      showToast('Task deleted');
      fetchTasksAndStats();
    } catch (err) {
      console.error('Delete failed:', err);
      showToast('Failed to delete task', 'error');
    }
  };

  return (
    <div className="app-container">
      <Navbar onOpenModal={handleOpenModal} />

      <StatsOverview stats={stats} />

      <TaskFilter
        search={search}
        setSearch={setSearch}
        status={statusFilter}
        setStatus={setStatusFilter}
        priority={priorityFilter}
        setPriority={setPriorityFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {loading ? (
        <div className="empty-state" style={{ padding: '3rem' }}>
          <Loader2 size={36} className="animate-spin" style={{ margin: '0 auto', animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '1rem' }}>Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <Inbox className="empty-icon" />
          <h3>No tasks found</h3>
          <p style={{ marginTop: '0.5rem' }}>
            {search || statusFilter !== 'all' || priorityFilter !== 'all' 
              ? 'Try adjusting your search or filters.' 
              : 'Click "New Task" to create your first task!'}
          </p>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onEdit={handleOpenModal}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />

      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
