const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

// @route    POST users
// @desc     Register a new user
// @access   Public
router.post('/', async (req, res) => {
  const { username, password, name, email, emp_no } = req.body;
  let user = null;

  let state = mongoose.connection.readyState;
  if (state !== 1) {
    return res.status(503).json({
      status: 503,
      msg: 'Service unavailable'
    });
  }

  try {
    // See if user exists by username or employee number
    user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({
        status: 400,
        msg: 'User already exists - Please choose another username'
      });
    }

    user = await User.findOne({ emp_no });
    if (user) {
      return res.status(400).json({
        status: 400,
        msg: 'There is already a registered user for your employee number'
      });
    }

    // create a new User from request body
    user = new User({
      username: username,
      password: password,
      name: name,
      email: email,
      emp_no: emp_no
    });

    // Encrypt password with bcrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to MongoDB
    await user.save();

    return res.status(201).json({
      status: 201,
      id: user._id,
      username: username,
      name: name,
      email: email,
      emp_no: emp_no
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// @route    DELETE users
// @desc     Delete all users (for testing only)
// @access   Public
router.delete('/', async (req, res) => {
  let state = mongoose.connection.readyState;
  if (state !== 1) {
    return res.status(503).json({
      status: 503,
      msg: 'Service unavailable'
    });
  }
  try {
    await User.remove();
    return res.status(200).json({
      status: 200,
      msg: 'OK - All users removed'
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// @route    GET users
// @desc     Get all users (for testing only)
// @access   Public
router.get('/', async (req, res) => {
  let state = mongoose.connection.readyState;
  if (state !== 1) {
    return res.status(503).json({
      status: 503,
      msg: 'Service unavailable'
    });
  }
  try {
    const users = await User.find().select('-password -_id -__v');
    if (!users.length) {
      return res.status(404).json({
        status: 404,
        msg: 'No users found'
      });
    } else {
      return res.status(200).json({
        status: 200,
        users
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

module.exports = router;
