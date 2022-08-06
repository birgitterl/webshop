const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Product = require('../../models/Product');
const Cart = require('../../models/Cart');

// Get cart items by username
router.get('/:username', async (req, res) => {
  const username = req.params.username;
  let cart = null;

  let state = mongoose.connection.readyState;
  if (state !== 1) {
    return res.status(503).json({
      status: 503,
      msg: 'Service unavailable'
    });
  }

  try {
    cart = await Cart.findOne({ username });
    console.log(Cart);
    if (cart && cart.products.length > 0) {
      return res.status(200).json({
        status: 200,
        cart
      });
    } else {
      return res.status(404).json({
        status: 404,
        msg: 'No cart found'
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// Add products to cart
router.post('/:username', async (req, res) => {
  const username = req.params.username;
  const { id, title, quantity, price } = req.body;
  let cart = null;
  let product = null;

  let state = mongoose.connection.readyState;
  if (state !== 1) {
    return res.status(503).json({
      status: 503,
      msg: 'Service unavailable'
    });
  }

  try {
    cart = await Cart.findOne({ username });
    product = await Product.findOne({ id });
    if (!product) {
      res.status(404).json({
        status: 404,
        msg: 'Item not found!'
      });
    }

    if (cart) {
      let productIndex = cart.products.findIndex((p) => p.id == id);
      if (productIndex > -1) {
        let productItem = cart.products[productIndex];
        productItem.quantity += quantity;
        cart.products[productIndex] = productItem;
      } else {
        cart.products.push({ id, title, quantity, price });
      }
      cart.totalAmount += quantity * price;
      cart = await cart.save();
      return res.status(201).json({
        status: 201,
        cart
      });
    } else {
      cart = new Cart({
        username: username,
        products: [
          {
            id: id,
            title: title,
            quantity: quantity,
            price: price
          }
        ],
        totalAmount: price
      });
      cart = await cart.save();
      return res.status(201).json({
        status: 201,
        cart
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// Delete all carts(for testing only)
router.delete('/', async (req, res) => {
  let state = mongoose.connection.readyState;
  if (state !== 1) {
    return res.status(503).json({
      status: 503,
      msg: 'Service unavailable'
    });
  }
  try {
    await Cart.remove();
    return res.status(200).json({
      status: 200,
      msg: 'OK - All carts removed'
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// Delete carts by username
router.delete('/:username', async (req, res) => {
  let username = req.params.username;
  let cart = null;
  let state = mongoose.connection.readyState;
  if (state !== 1) {
    return res.status(503).json({
      status: 503,
      msg: 'Service unavailable'
    });
  }
  try {
    cart = await Cart.findOne({ username });
    console.log(cart);

    await Cart.deleteOne({ username });

    return res.status(200).json({
      status: 200,
      msg: `OK - Cart of ${username} removed`
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});
module.exports = router;
