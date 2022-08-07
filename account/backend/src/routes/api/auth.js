const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

// @route    POST auth
// @desc     Login user and get token
// @access   Public
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  let state = mongoose.connection.readyState;
  if (state !== 1) {
    return res.status(503).json({
      status: 503,
      msg: 'Service unavailable'
    });
  }

  try {
    // check if user exists
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        status: 404,
        msg: 'Invalid Username. Please try again.'
      });
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        status: 404,
        msg: 'Invalid Password. Please try again'
      });
    }

    // return token
    const payload = {
      user: {
        username: user.username
      }
    };

    jwt.sign(payload, 'mysecrettoken', { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      return res.status(200).json({ status: 200, token });
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

module.exports = router;
