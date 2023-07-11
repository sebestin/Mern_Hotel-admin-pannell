const catchAsyncErrors = require('../../middleware/catchAsyncErrors.js');
const Snack = require('../../models/AdminModels/snackModel.js');
const ErrorHandler = require('../../utils/errorhander.js');

// exports.createSnack = catchAsyncErrors(async (req, res, next) => {
//   const data = await Snack.create(req.body);
//   res.status(201).json({
//     success: true,
//     data,
//   });
// });

exports.createSnack = catchAsyncErrors(async (req, res, next) => {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i <= 1500; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    Snack.insertMany([
      {
        dish: text.substring(0, 8),
        price: i + 1,
        quantity: i,
        description: text.substring(0, 5),
      },
    ])
      .then(function () {
        res.status(201).json({ success: true, i });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});

exports.findAllSnack = catchAsyncErrors(async (req, res, next) => {
  const data = await Snack.find();
  if (!data) {
    return next(new ErrorHandler('Snack not found', 404));
  }
  res.status(200).json({
    success: true,
    data,
  });
});

exports.findSingleSnack = catchAsyncErrors(async (req, res, next) => {
  const snack = await Snack.findById(req.params.id);
  if (!snack) {
    return next(new ErrorHandler('Snack not found', 404));
  }
  res.status(200).json({
    success: true,
    snack,
  });
});

exports.updateSnack = catchAsyncErrors(async (req, res, next) => {
  let snack = await Snack.findById(req.params.id);

  if (!snack) {
    return next(new ErrorHandler('Snack not found', 404));
  }

  snack = await Snack.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    snack,
  });
});

exports.deleteSingleSnack = catchAsyncErrors(async (req, res) => {
  const data = await Snack.findById(req.params.id);
  if (!data) {
    return next(new ErrorHandler('Snacks not found', 404));
  }
  await data.remove();
  res.status(200).json({
    success: true,
    message: 'Snack Delete Successfully',
  });
});
