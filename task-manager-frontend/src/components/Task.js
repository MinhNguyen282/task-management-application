// client/src/components/Task.js
import React, { useState } from 'react';
import axios from 'axios';

const Task = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    status: task.status
  });

  const API_URL = process.env.REACT_APP_API_URL;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        setIsDeleting(true);
        await axios.delete(`${API_URL}/tasks/${task._id}`);
        if (onDelete) {
          onDelete(task._id);
        }
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Error deleting task. Please try again.');
      } finally{
        setIsDeleting(false);
      }
    }
  };

  const handleEdit = async () => {
    try {
      await axios.patch(`${API_URL}/tasks/${task._id}`, editedTask);
      setIsEditing(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const statusOptions = ['todo', 'in-progress', 'completed'];

  if (isEditing) {
    return (
      <div className="task-item editing">
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
        />
        <textarea
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
        />
        <select
          value={editedTask.status}
          onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
        >
          {statusOptions.map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
        <button onClick={handleEdit}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <div className="task-actions">
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default Task;