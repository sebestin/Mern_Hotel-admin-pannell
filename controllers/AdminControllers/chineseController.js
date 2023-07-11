const catchAsyncErrors = require('../../middleware/catchAsyncErrors.js');
const Chinese = require('../../models/AdminModels/chineseModel.js');
const ErrorHandler = require('../../utils/errorhander.js');

exports.createChinese = catchAsyncErrors(async (req, res, next) => {
  const data = await Chinese.create(req.body);
  res.status(201).json({
    success: true,
    data,
  });
});

exports.findAllChinese = catchAsyncErrors(async (req, res, next) => {
  const data = await Chinese.find();
  if (!data) {
    return next(new ErrorHandler('chineese not found', 404));
  }
  res.status(200).json({
    success: true,
    data,
  });
});

exports.findSingleChinese = catchAsyncErrors(async (req, res, next) => {
  const chinese = await Chinese.findById(req.params.id);
  if (!chinese) {
    return next(new ErrorHandler('chineese not found', 404));
  }
  res.status(200).json({
    success: true,
    chinese,
  });
});

exports.updateChinese = catchAsyncErrors(async (req, res, next) => {
  let chineese = await Chinese.findById(req.params.id);
  if (!chineese) {
    return next(new ErrorHandler('chineese not found', 404));
  }
  chineese = await Chinese.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(201).json({
    success: true,
    chineese,
  });
});

exports.deleteChinese = catchAsyncErrors(async (req, res, next) => {
  const chineese = await Chinese.findById(req.params.id);
  if (!chineese) {
    return next(new ErrorHandler('chineese not found', 404));
  }
  await chineese.remove();
  res.status(200).json({
    success: true,
    message: 'Chinese Delete Successfully',
  });
});
