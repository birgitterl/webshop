const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Product = require('../../models/Product');
const Cart = require('../../models/Cart');

// @route    get cart/:username
// @desc     Get cart by username
// @access   Public
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
    //check if a cart exists for the user
    cart = await Cart.findOne({ username });

    // return cart
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
    console.log(error);
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// @route    POST cart/:username
// @desc     Create or update a cart
// @access   Public
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
    // check if cart exists for the user
    cart = await Cart.findOne({ username });

    // check if product exists
    product = await Product.findOne({ id });

    if (!product) {
      return res.status(404).json({
        status: 404,
        msg: 'Item not found!'
      });
    }

    // if a cart exists for the user; the cart is updated
    if (cart) {
      let productIndex = cart.products.findIndex((p) => p.id == id);

      // check if product is already in the cart to update quantity and total amount
      if (productIndex > -1) {
        let productItem = cart.products[productIndex];
        productItem.quantity += quantity;
        productItem.totalAmount = productItem.quantity * price;
        cart.products[productIndex] = productItem;
      } else {
        // add new cart item from request body
        let totalAmount = price;
        cart.products.push({ id, title, quantity, price, totalAmount });
      }
      cart.products.forEach((e) => {
        sum += e.totalAmount;
      });
      cart.cartPrice = sum;
      cart = await cart.save();
      return res.status(201).json({
        status: 201,
        cart
      });
    } else {
      // cart does not exist for the user; a new cart is created
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

// @route    PUT cart/:username
// @desc     Update the quantity of a cart item
// @access   Public
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
    // check if cart exists for the user
    cart = await Cart.findOne({ username });

    // check if product exists
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
      let productItem = cart.products[productIndex];

      // increase quantity of a cart item
      if (increase) {
        productItem.quantity += 1;
        productItem.totalAmount = productItem.quantity * price;
        cart.products[productIndex] = productItem;
        cart.products.forEach((e) => {
          sum += e.totalAmount;
        });
        cart.cartPrice = sum;

        // decrease quantity leads to quantity=0: remove item from cart
      } else if (!increase && productItem.quantity == 1) {
        cart.products.splice(productIndex, 1);
        cart.products.forEach((e) => {
          sum += e.totalAmount;
        });
        cart.cartPrice = sum;

        // decrease quantity of a cart item
      } else if (!increase && productItem.quantity > 0) {
        productItem.quantity -= 1;
        productItem.totalAmount = productItem.quantity * price;
        cart.products[productIndex] = productItem;
        cart.products.forEach((e) => {
          sum += e.totalAmount;
        });
        cart.cartPrice = sum;
      }

      // save cart updates
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

// @route    DELETE cart
// @desc     Delete all carts(for testing only)
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
    await Cart.remove();
    return res.status(200).json({
      status: 200,
      msg: 'OK - All carts removed'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// @route    DELETE cart/:username
// @desc     Delete  carts for a given user
// @access   Public
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
    // check if cart exists for the username
    cart = await Cart.findOne({ username });

    await Cart.deleteOne({ username });

    return res.status(200).json({
      status: 200,
      msg: `OK - Cart of ${username} removed`
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// @route    GET cart
// @desc     Get all carts(for testing only)
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
    const carts = await Cart.find().select('-_id -__v');

    // check if any carts exist
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});
module.exports = router;
