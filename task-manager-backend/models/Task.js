const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'completed'],
    default: 'todo',
  },
  category: {
    type: String,
    enum: ['work', 'personal', 'study', 'shopping', 'health', 'others'],
    default: 'others',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

//findOneAndDelete
taskSchema.pre('findOneAndDelete', function(next) {
  console.log('Attempting to delete task:', this.getQuery());
  next();
});

taskSchema.post('findOneAndDelete', function(doc) {
  console.log('Deleted task:', doc);
});

module.exports = mongoose.model('Task', taskSchema);
