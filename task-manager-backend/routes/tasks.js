// server/routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create task
router.post('/', async (req, res) => {
  try {
    console.log('Received task data:', req.body);
    
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || 'todo'
    });

    const savedTask = await task.save();
    console.log('Saved task:', savedTask);
    
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).json({ 
      message: 'Error creating task',
      error: error.message 
    });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ 
      message: 'Error deleting task',
      error: error.message 
    });
  }
});

module.exports = router;