const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    try {
        const {username, email, password} = req.body;

        // Check if the user already exists
        const userExists = await User.findOne({$or: [{username}, {email}]});
        if (userExists) {
            return res.status(400).json({message: 'User already exists'});
        }

        // Create a new user
        const user = new User({username, email, password});
        await user.save();

        // Create a token
        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                password: user.password
            }
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if the user exists
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'User not found'});
        }

        //Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        // Create a token
        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

module.exports = router;