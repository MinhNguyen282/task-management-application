// client/src/pages/CreateTask.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import './Pages.css';

const CreateTask = () => {
  const navigate = useNavigate();

  const handleTaskCreated = (newTask) => {
    // Navigate to the task list after creating a task
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Create New Task</h2>
        <button 
          className="nav-button"
          onClick={() => navigate('/')}
        >
          View All Tasks
        </button>
        <button 
          className="nav-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <TaskForm onTaskCreated={handleTaskCreated} />
    </div>
  );
};

export default CreateTask;