const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// Get user profile
router.get('/profile', auth, async (req, res) => {
    try {
      console.log('Fetching profile for user:', req.userId);
      const user = await User.findById(req.userId).select('-password');
      if (!user){
        return res.status(404).json({ message: 'User not found'});
      }
      res.json(user);
    } catch (error){
      console.log(error.message);
      res.status(500).json({message: error.message});
    }
});

// Update user profile
router.patch('/profile', auth, async (req, res) => {
    try {
      const updates = req.body;
      const user = await User.findById(req.userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update basic info
      if (updates.username) user.username = updates.username;
      if (updates.email) user.email = updates.email;
      if (updates.avatar) user.avatar = updates.avatar;
  
      // Update settings
      if (updates.settings) {
        user.settings = { ...user.settings, ...updates.settings };
      }
  
      // Update password if provided
      if (updates.password) {
        user.password = await bcrypt.hash(updates.password, 10);
      }
  
      await user.save();
      
      // Send back user without password
      const userResponse = user.toObject();
      delete userResponse.password;
      
      res.json(userResponse);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  module.exports = router;