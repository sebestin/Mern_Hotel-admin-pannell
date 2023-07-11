const mongoose = require('mongoose');
const validator = require('validator');

// const orderPage = mongoose.Schema(
//     {

//         dish: [
//             {
//                 name: {
//                     type: String,
//                     required: true,
//                 }
//             }],
//         quantity: {
//             type: String,
//             required: [true, 'Please Enter Quantity'],
//             // unique: true,
//             // validate: [validator.isEmail, 'Please Enter a valid Email'],
//         },
//         tablenum: {
//             type: String,
//             required: [true, 'Please Enter Table Number'],
//         }
//     },
//     {
//         timestamps: true,
//     }
// );

// module.exports = mongoose.model('orderPage', orderPage);

const orderPage = mongoose.Schema(
  {
    dish: [
      {
        item: {
          name: [],
          quantity: [],
        },
      },
    ],
    tablenum: {
      type: String,
      required: [true, 'Please Enter Table Number'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('orderPage', orderPage);
