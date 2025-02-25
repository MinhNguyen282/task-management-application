// client/src/components/TaskForm.js
import React, { useState } from 'react';
import axios from 'axios';
import CategoryLabel from './CategoryLabel';
import './TaskForm.css';

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    category: 'others',
    priority: 'medium',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = ['work', 'personal', 'study', 'shopping', 'health', 'others'];

  const priorityLevels = ['low', 'medium', 'high'];

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
        status: 'todo',
        category: 'others',
        priority: 'medium',
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
      <h2>Create a Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor='title'>Title</label>
          <input 
            type="text"
            id='title'
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Task title"
            required
          />
        </div>

        <div className="form-group">
          <textarea
            id='description'
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Task description"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

         <div className="form-group">
           <label htmlFor="category">Category</label>
           <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="category-preview">
            <label>Selected Category:</label>
            <CategoryLabel category={formData.category} />
          </div>

          <div className="form-group">
            <label htmlFor='priority'>Priority</label>
            <select
              id='priority'
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
            >
              {priorityLevels.map(priority => (
                <option key={priority} value={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>
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