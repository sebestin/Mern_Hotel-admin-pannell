const mongoose = require('mongoose');
// const validator = require('validator');

const tableSchema = mongoose.Schema(
  {
    tableName: {
      type: String,
      required: [true, 'Please enter the dish name'],
      // maxLength: [30, 'Name cannot exceed 30 characters'],
      // minLength: [3, 'Name should have more than 4 characters'],
    },

    tableNumber: {
      type: Number,
      required: [true, 'Please Enter Quantity'],
      // unique: true,
      // validate: [validator.isEmail, 'Please Enter a valid Email'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('table', tableSchema);
