// client/src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';
import LoadingSpinner from './LoadingSpinner';
import './TaskList.css';
import config from '../config';


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.API_URL}/tasks`);
      setTasks(response.data);
      setError(null);
    } catch (error) {
      setError('Error fetching tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      // Refresh the task list after deletion
      await fetchTasks();
    } catch (error) {
      setError('Error deleting task. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (tasks.length === 0) return <div className="no-tasks">No tasks found. Create one!</div>;

  return (
    <div className="task-list">
      {tasks.map(task => (
        <Task
          key={task._id}
          task={task}
          onDelete={handleTaskDelete}
          onUpdate={fetchTasks}
        />
      ))}
    </div>
  );
};

export default TaskList;