const catchAsyncErrors = require('../../middleware/catchAsyncErrors.js');
const Pizza = require('../../models/AdminModels/pizzaModel.js');
const ErrorHandler = require('../../utils/errorhander.js');

exports.createPizza = catchAsyncErrors(async (req, res, next) => {
  const pizza = await Pizza.create(req.body);

  res.status(201).json({
    success: true,
    pizza,
  });
});

exports.findAllPizza = catchAsyncErrors(async (req, res, next) => {
  const pizza = await Pizza.find();
  if (!pizza) {
    return next(new ErrorHandler('Pizza not found', 404));
  }
  res.status(200).json({
    success: true,
    pizza,
  });
});

exports.findSinglePizza = catchAsyncErrors(async (req, res, next) => {
  const pizza = await Pizza.findById(req.params.id);
  if (!pizza) {
    return next(new ErrorHandler('Pizza not found', 404));
  }
  res.status(200).json({
    success: true,
    pizza,
  });
});

exports.updatePizza = catchAsyncErrors(async (req, res, next) => {
  let pizza = await Pizza.findById(req.params.id);
  if (!pizza) {
    return next(new ErrorHandler('Pizza not found', 404));
  }
  pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({
    success: true,
    pizza,
  });
});

exports.daletePizza = catchAsyncErrors(async (req, res, next) => {
  const pizza = await Pizza.findById(req.params.id);
  if (!pizza) {
    return next(new ErrorHandler('Pizza not found', 404));
  }
  await pizza.remove();
  res.status(200).json({
    success: true,
    message: 'Pizza Deleted Successfully',
  });
});
