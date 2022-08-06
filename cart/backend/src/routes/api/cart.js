const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Product = require('../../models/Product');
const Cart = require('../../models/Cart');

// Get carts by username
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
    if (cart) {
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
  let sum = 0;

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
      return res.status(404).json({
        status: 404,
        msg: 'Item not found!'
      });
    }

    if (cart) {
      let productIndex = cart.products.findIndex((p) => p.id == id);

      if (productIndex > -1) {
        let productItem = cart.products[productIndex];
        productItem.quantity += quantity;
        productItem.totalAmount = productItem.quantity * price;
        cart.products[productIndex] = productItem;
      } else {
        let totalAmount = price;
        cart.products.push({ id, title, quantity, price, totalAmount });
      }
      cart.products.forEach((e) => {
        sum += e.totalAmount;
      });
      cart.cartPrice = sum;
      console.log(cart.cartPrice);
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
            price: price,
            totalAmount: price
          }
        ],
        cartPrice: price
      });
      cart = await cart.save();
      return res.status(201).json({
        status: 201,
        cart
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

// Update quantity
router.put('/:username', async (req, res) => {
  const username = req.params.username;
  const { id, increase } = req.body;
  let cart = null;
  let product = null;
  let sum = 0;

  let state = mongoose.connection.readyState;
  if (state !== 1) {
    return res.status(503).json({
      status: 503,
      msg: 'Service unavailable'
    });
  }

  try {
    cart = await Cart.findOne({ username });
    product = cart.products.find((e) => e.id == id);
    if (!cart) {
      return res.status(404).json({
        status: 404,
        msg: 'There is no cart for this user'
      });
    } else if (!product) {
      return res.status(404).json({
        status: 404,
        msg: 'Product does not exist in the cart'
      });
    } else {
      let price = product.price;
      let productIndex = cart.products.findIndex((p) => p.id == id);
      if (productIndex > -1) {
        let productItem = cart.products[productIndex];
        if (increase) {
          productItem.quantity += 1;
          productItem.totalAmount = productItem.quantity * price;
          cart.products[productIndex] = productItem;
          cart.products.forEach((e) => {
            sum += e.totalAmount;
          });
          cart.cartPrice = sum;
        } else if (!increase && productItem.quantity == 0) {
          return res.status(404).json({
            status: 404,
            msg: 'Quantity cannot be negative!'
          });
        } else if (!increase && productItem.quantity == 1) {
          cart.products.splice(productIndex, 1);
          cart.products.forEach((e) => {
            sum += e.totalAmount;
          });
          cart.cartPrice = sum;
        } else if (!increase && productItem.quantity > 0) {
          productItem.quantity -= 1;
          productItem.totalAmount = productItem.quantity * price;
          cart.products[productIndex] = productItem;
          cart.products.forEach((e) => {
            sum += e.totalAmount;
          });
          cart.cartPrice = sum;
        }
        cart = await cart.save();
        return res.status(201).json({
          status: 201,
          cart
        });
      }
    }
  } catch (error) {
    console.log(error);
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

// Get all carts (for testing only)
router.get('/', async (req, res) => {
  let state = mongoose.connection.readyState;
  if (state !== 1) {
    return res.status(503).json({
      status: 503,
      msg: 'Service unavailable'
    });
  }
  try {
    const carts = await Cart.find().select('-_id -__v');
    if (!carts.length) {
      return res.status(404).json({
        status: 404,
        msg: 'No carts found'
      });
    } else {
      return res.status(200).json({
        status: 200,
        carts
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
