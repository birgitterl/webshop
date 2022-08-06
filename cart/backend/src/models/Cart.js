const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  products: [
    {
      id: {
        type: Number
      },
      title: {
        type: String
      },
      quantity: {
        type: Number,
        required: true,
        min: [0, 'quantity cannot be negative']
      },
      price: {
        type: Number,
        required: true
      },
      totalAmount: {
        type: Number,
        required: true,
        min: [0, 'quantity cannot be negative']
      }
    }
  ],
  cartPrice: {
    type: Number,
    required: true
  }
});

module.exports = Cart = mongoose.model('cart', CartSchema);
