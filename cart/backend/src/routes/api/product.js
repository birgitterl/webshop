const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Product = require('../../models/Product');

// Create or Update a product
router.post('/', async (req, res) => {
  const { id, title, price, description, category, image } = req.body;
  let product = null;

  let state = mongoose.connection.readyState;
  if (state !== 1) {
    return res.status(503).json({
      status: 503,
      msg: 'Service unavailable'
    });
  }

  const productFields = {
    id: id,
    title: title,
    price: price,
    category: category,
    description: description,
    image: image
  };

  try {
    product = await Product.findOne({ id });

    if (product) {
      product = await Product.findOneAndUpdate(
        { id },
        { $set: productFields },
        { new: true }
      );

      return res.status(201).json({ status: 201, product });
    }
    product = new Product(productFields);
    await product.save();
    return res.status(201).json({ status: 201, product });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// Delete all products (for testing only)
router.delete('/', async (req, res) => {
  let state = mongoose.connection.readyState;
  if (state !== 1) {
    return res.status(503).json({
      status: 503,
      msg: 'Service unavailable'
    });
  }
  try {
    await Product.remove();
    return res.status(200).json({
      status: 200,
      msg: 'OK - All products removed'
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// Get all products (for testing only)
router.get('/', async (req, res) => {
  let products = null;
  let state = mongoose.connection.readyState;
  if (state !== 1) {
    return res.status(503).json({
      status: 503,
      msg: 'Service unavailable'
    });
  }

  try {
    products = await Product.find().select('-_id -__v');
    if (!products.length) {
      return res.status(404).json({
        status: 404,
        msg: 'No products found'
      });
    } else {
      return res.status(200).json({
        status: 200,
        products
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
