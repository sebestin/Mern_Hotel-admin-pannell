const catchAsyncErrors = require('../../middleware/catchAsyncErrors.js');
const IndianDish = require('../../models/AdminModels/indianModel.js');
const ErrorHandler = require('../../utils/errorhander.js');

exports.createIndianDish = catchAsyncErrors(async (req, res, next) => {
  const data = await IndianDish.create(req.body);
  res.status(201).json({
    success: true,
    data,
  });
});

exports.findAllIndianDish = catchAsyncErrors(async (req, res, next) => {
  const data = await IndianDish.find();
  if (!data) {
    return next(new ErrorHandler('Dish not found', 404));
  }
  res.status(200).json({
    success: true,
    data,
  });
});

exports.findSingleIndianDish = catchAsyncErrors(async (req, res, next) => {
  const indian = await IndianDish.findById(req.params.id);
  if (!indian) {
    return next(new ErrorHandler('Dish not found', 404));
  }
  res.status(200).json({
    success: true,
    indian,
  });
});

exports.updateIndianDish = catchAsyncErrors(async (req, res, next) => {
  let indian = await IndianDish.findById(req.params.id);
  if (!indian) {
    return next(new ErrorHandler('Dish not found', 404));
  }
  indian = await IndianDish.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    indian,
  });
});

exports.deleteIndianDish = catchAsyncErrors(async (req, res, next) => {
  const data = await IndianDish.findById(req.params.id);
  if (!data) {
    return next(new ErrorHandler('Dish not found', 404));
  }
  await data.remove();
  res.status(200).json({
    success: true,
    message: 'Dish deleted',
  });
});
