const mongoose = require('mongoose');
const validator = require('validator');

const drinkSchema = mongoose.Schema({
  drink: {
    type: String,
    required: [true, 'Please Enter Drink name'],
  },
  price: {
    type: Number,
  },

  quantity: {
    type: Number,
    required: [true, 'Please Enter Quantity'],
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    default: 'drink',
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('drink', drinkSchema);
