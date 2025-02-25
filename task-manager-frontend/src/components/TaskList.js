// client/src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';
import LoadingSpinner from './LoadingSpinner';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks`);
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
    <div className="task-list">
      {tasks.map(task => (
        <Task
          key={task._id}
          task={task}
          onDelete={handleTaskDelete}
          onUpdate={handleTaskUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;