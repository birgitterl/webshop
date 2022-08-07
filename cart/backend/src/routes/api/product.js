const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Product = require('../../models/Product');

// Create or Update a product
// @route    POST product
// @desc     Create or update a product
// @access   Public
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

  // define product properties from request body
  const productFields = {
    id: id,
    title: title,
    price: price,
    category: category,
    description: description,
    image: image
  };

  try {
    //check if product exists alread
    product = await Product.findOne({ id });

    // update product
    if (product) {
      product = await Product.findOneAndUpdate(
        { id },
        { $set: productFields },
        { new: true }
      );

      return res.status(201).json({ status: 201, product });

      // create a new product
    } else {
      product = new Product(productFields);
      await product.save();
      return res.status(201).json({ status: 201, product });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// @route    DELETE product
// @desc     Delete all products (for testing only)
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
    await Product.remove();
    return res.status(200).json({
      status: 200,
      msg: 'OK - All products removed'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// @route    GET product
// @desc     Get all products (for testing only)
// @access   Public
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
    // check if any products exist
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

module.exports = router;
