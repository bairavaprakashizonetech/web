import React from 'react';
import { CheckSquare, Plus } from 'lucide-react';

const Navbar = ({ onOpenModal }) => {
  return (
    <header className="navbar">
      <div className="nav-brand">
        <div className="brand-icon">
          <CheckSquare size={24} />
        </div>
        <div>
          <h1 className="brand-title">TaskMaster</h1>
        </div>
      </div>
      <div className="nav-actions">
        <button 
          className="btn btn-primary"
          onClick={() => onOpenModal(null)}
          id="btn-add-task"
        >
          <Plus size={18} />
          <span>New Task</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
