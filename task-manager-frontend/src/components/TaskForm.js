// client/src/components/TaskForm.js
import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      console.log('Submitting to:', `${API_URL}/tasks`);
      console.log('Data:', formData);
      
      const response = await axios.post(`${API_URL}/tasks`, formData);
      console.log('Response:', response.data);
      
      if (onTaskCreated) {
        onTaskCreated(response.data);
      }
      
      setFormData({
        title: '',
        description: '',
        status: 'todo'
      });
      
    } catch (error) {
      console.error('Error creating task:', error);
      setError(error.response?.data?.message || 'Error creating task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Task title"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Task description"
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;