// client/src/components/Task.js
import React, { useState } from 'react';
import api from '../utils/api';
import CategoryLabel from './CategoryLabel';
import './Task.css';

const Task = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title || '',
    description: task.description || '',
    status: task.status || 'todo',
    category: task.category || 'others',
    priority: task.priority || 'medium',
  });

  const categories = ['work', 'personal', 'study', 'shopping', 'health', 'others'];

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        setIsDeleting(true);
        await api.delete(`/tasks/${task._id}`);
        if (onDelete) {
          onDelete(task._id);
        }
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Error deleting task. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  }; 

  const handleEdit = async () => {
    try {
      const response = await api.patch(`/tasks/${task._id}`, editedTask);
      setIsEditing(false);
      if (onUpdate) {
        onUpdate(response.data);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const statusOptions = ['todo', 'in-progress', 'completed'];

  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="edit-form">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            placeholder="Task title"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            placeholder="Task description"
          />
          <div className="form-row">
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
            <select
              value={editedTask.category}
              onChange={(e) => setEditedTask({ ...editedTask, category: e.target.value })}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="button-group">
            <button onClick={handleEdit} className="save-button">Save</button>
            <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="task-item">
      <div className="task-header">
        <h3>{task.title}</h3>
        <CategoryLabel category={task.category} />
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-footer">
      <span className={`status-badge ${task.status}`}>
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
        <span className={`status-badge ${task.priority}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
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
    </div>
  );
};

export default Task;