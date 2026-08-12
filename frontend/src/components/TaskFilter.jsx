import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

const TaskFilter = ({ 
  search, 
  setSearch, 
  status, 
  setStatus, 
  priority, 
  setPriority, 
  sortBy, 
  setSortBy 
}) => {
  return (
    <div className="toolbar">
      <div className="search-box">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="input-task-search"
        />
      </div>

      <div className="filter-group">
        <div className="status-tabs">
          <button
            className={`tab-btn ${status === 'all' ? 'active' : ''}`}
            onClick={() => setStatus('all')}
            id="tab-all"
          >
            All
          </button>
          <button
            className={`tab-btn ${status === 'active' ? 'active' : ''}`}
            onClick={() => setStatus('active')}
            id="tab-active"
          >
            Active
          </button>
          <button
            className={`tab-btn ${status === 'completed' ? 'active' : ''}`}
            onClick={() => setStatus('completed')}
            id="tab-completed"
          >
            Completed
          </button>
        </div>

        <select
          className="filter-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          id="select-priority-filter"
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          id="select-sort-by"
        >
          <option value="created_desc">Newest First</option>
          <option value="created_asc">Oldest First</option>
          <option value="due_date">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilter;
