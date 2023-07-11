const mongoose = require('mongoose');
const validator = require('validator');

const indianDishSchema = mongoose.Schema({
  dish: {
    type: String,
    required: [true, 'Please enter the dish name'],
    // maxLength: [30, 'Name cannot exceed 30 characters'],
    // minLength: [3, 'Name should have more than 4 characters'],
  },
  price: {
    type: Number,
    // required: [true, 'Please Enter Your Last Name'],
    // maxLength: [30, 'Last name cannot exceed 30 characters'],
    // minLength: [3, 'Last name should have more than 4 characters'],
  },

  quantity: {
    type: Number,
    required: [true, 'Please Enter Quantity'],
    // unique: true,
    // validate: [validator.isEmail, 'Please Enter a valid Email'],
  },
  description: {
    type: String,
    // required: [true, 'Please Enter Quantity'],
    // unique: true,
    // validate: [validator.isEmail, 'Please Enter a valid Email'],
  },
  category: {
    type: String,
    default: 'indian',
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

module.exports = mongoose.model('indiandish', indianDishSchema);
