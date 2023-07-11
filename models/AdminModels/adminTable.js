const mongoose = require('mongoose');
const validator = require('validator');
const adminTable = mongoose.Schema(
  {
    dish: {
      item: [
        {
          name: { type: String },
          quantity: { type: Number },
        },
      ],
    },
    tablenum: {
      type: String,
      required: [true, 'Please Enter Table Number'],
      unique: [true, 'Table number already exist'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('admintable', adminTable);
