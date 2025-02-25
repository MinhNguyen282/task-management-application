// client/src/pages/TaskListPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import './Pages.css';

const TaskListPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Task List</h2>
        <button 
          className="nav-button"
          onClick={() => navigate('/create')}
        >
          Create New Task
        </button>
      </div>
      <TaskList />
    </div>
  );
};

export default TaskListPage;