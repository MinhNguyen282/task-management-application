// client/src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Task from './Task';
import LoadingSpinner from './LoadingSpinner';

const TaskList = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const filteredTasks = tasks.filter(task => 
    selectedCategory === 'all' ? true : task.category === selectedCategory
  );

  const categories = ['work', 'personal', 'study', 'shopping', 'health', 'others'];

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get(`${API_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Error fetching tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  const handleTaskUpdate = async () => {
    await fetchTasks(); // Refresh the list after update
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (!tasks.length) return <div className="no-tasks">No tasks found. Create one!</div>;

  return (
    <div className="task-list-container">
      <div className="task-list-filter">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      <div className="task-list">
        {filteredTasks.map(task => (
          <Task
            key={task._id}
            task={task}
            onDelete={handleTaskDelete}
            onUpdate={handleTaskUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;