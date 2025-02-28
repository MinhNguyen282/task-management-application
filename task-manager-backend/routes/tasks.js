// server/routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth')
const mongoose = require('mongoose');
// import { ObjectId } from 'bson';

// Get all tasks
router.post('/all', auth, async (req, res) => {
  try {
    const tasks = await Task.find({user: req.body.userId}).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create task
router.post('/', auth, async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      category: req.body.category,
      priority: req.body.priority,
      user: req.body.userId,
    });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update task
router.patch('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById({_id: req.params.id, user: req.body.userId});

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    Object.keys(req.body).forEach(key => {
      task[key] = req.body[key];
    });

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const task = await Task.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(req.params.id),
      user: new mongoose.Types.ObjectId(req.userId)
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }


    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;