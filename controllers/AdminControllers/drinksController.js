const catchAsyncErrors = require('../../middleware/catchAsyncErrors.js');
const Drink = require('../../models/AdminModels/drinksModel.js');
const ErrorHandler = require('../../utils/errorhander.js');

// exports.createDrink = (req, res) => {
//   const drinkData = new Drink({
//     dish: req.body.dish,
//     price: req.body.price,
//     quantity: req.body.quantity,

//
//   });
//   drinkData
//     .save()
//     .then((data) => {
//       res.status(201).send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message,
//       });
//     });
// };

exports.createDrink = catchAsyncErrors(async (req, res, next) => {
  const drink = await Drink.create(req.body);
  res.status(201).json({
    success: true,
    drink,
  });
});

//Find all drinks

// exports.findAllDrink = (req, res) => {
//   Drink.find({})
//     .then((data) => {
//       // console.log('Data----------', data);
//       res.status(200).send(data);
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: err.message,
//       });
//     });
// };

exports.findAllDrink = catchAsyncErrors(async (req, res, next) => {
  const drinks = await Drink.find();
  if (!drinks) {
    return next(new ErrorHandler('Drink not found', 404));
  }
  res.status(200).json({
    success: true,
    drinks,
  });
});

//Find single user
// exports.findSingleDrink = (req, res) => {
//   Drink.findById(req.params.drinkId)
//     .then((data) => {
//       res.status(200).send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message,
//       });
//     });
// };
exports.findSingleDrink = catchAsyncErrors(async (req, res, next) => {
  const drink = await Drink.findById(req.params.id);
  if (!drink) {
    return next(new ErrorHandler('Drink not found', 404));
  }
  res.status(200).json({
    success: true,
    drink,
  });
});

//Update Drink
// exports.updateDrink = (req, res) => {
//   Drink.findByIdAndUpdate(
//     req.params.drinkId,
//     {
//       dish: req.body.dish,
//       price: req.body.price,
//       quantity: req.body.quantity,
//     },
//     { new: true }
//   )
//     .then((data) => {
//       res.status(200).send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message,
//       });
//     });
// };

exports.updateDrink = catchAsyncErrors(async (req, res, next) => {
  let drink = await Drink.findById(req.params.id);

  if (!drink) {
    return next(new ErrorHandler('Drink not found', 404));
  }

  drink = await Drink.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json({
    success: true,
    drink,
  });
});

//Delete Drink
// exports.deleteSingleDrink = (req, res) => {
//   Drink.findByIdAndRemove(req.params.drinkId)
//     .then(() => {
//       res.status(200).send({ message: 'Drink deleted successfully!' });
//     })
//     .catch((err) => {
//       return res.status(404).send({
//         message: err.message,
//       });
//     });
// };

exports.deleteDrink = catchAsyncErrors(async (req, res) => {
  const data = await Drink.findById(req.params.id);
  if (!data) {
    return next(new ErrorHandler('Drink not found', 404));
  }
  await data.remove();
  res.status(200).json({
    success: true,
    message: 'Drink Deleted Successfully',
  });
});
