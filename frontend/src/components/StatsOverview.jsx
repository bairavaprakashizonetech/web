import React from 'react';
import { ListTodo, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

const StatsOverview = ({ stats }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-info">
          <div className="stat-label">Total Tasks</div>
          <div className="stat-value">{stats?.total || 0}</div>
        </div>
        <div className="stat-icon total">
          <ListTodo size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <div className="stat-label">Completed</div>
          <div className="stat-value">{stats?.completed || 0}</div>
        </div>
        <div className="stat-icon completed">
          <CheckCircle2 size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <div className="stat-label">Pending</div>
          <div className="stat-value">{stats?.pending || 0}</div>
        </div>
        <div className="stat-icon pending">
          <Clock size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <div className="stat-label">High Priority</div>
          <div className="stat-value">{stats?.high_priority || 0}</div>
        </div>
        <div className="stat-icon urgent">
          <AlertTriangle size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
