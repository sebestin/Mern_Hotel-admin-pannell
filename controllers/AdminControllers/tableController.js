const catchAsyncErrors = require('../../middleware/catchAsyncErrors.js');
const Table = require('../../models/AdminModels/TableModel.js');
const ErrorHandler = require('../../utils/errorhander.js');

// exports.createTable = catchAsyncErrors(async (req, res, next) => {
//   const table = await Table.create(req.body);
//   res.status(201).json({
//     success: true,
//     table,
//   });
// });

exports.createTable = catchAsyncErrors(async (req, res, next) => {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var table;
  for (let i = 1; i <= 1000; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    table = await Table.insertMany([
      {
        tableName: text.substring(0, 7),
        tableNumber: i + 1,
      },
    ]);
  }
  res.status(200).json({
    success: true,
    table,
  });
});

// exports.createTable = catchAsyncErrors(async (req, res, next) => {
//   var text = '';
//   var possible =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   for (let i = 0; i <= 500; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));

//     await Table.insertMany([
//       {
//         tableName: text.substring(0, 7),
//         tableNumber: i + 1,
//       },
//     ]);
//     res.status(201).json({
//       success: true,
//     });
//   }
// });

exports.findAllTables = catchAsyncErrors(async (req, res, next) => {
  const table = await Table.find();
  if (!table) {
    return next(new ErrorHandler('Table not found', 404));
  }
  res.status(200).json({
    success: true,
    table,
  });
});

exports.findSingleTable = catchAsyncErrors(async (req, res, next) => {
  const table = await Table.findById(req.params.id);
  if (!table) {
    return next(new ErrorHandler('Table not found', 404));
  }
  res.status(200).json({
    success: true,
    table,
  });
});

exports.updateTable = catchAsyncErrors(async (req, res, next) => {
  let table = await Table.findById(req.params.id);
  if (!table) {
    return next(new ErrorHandler('Table not found', 404));
  }
  table = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({
    success: true,
    table,
  });
});

exports.deleteTable = catchAsyncErrors(async (req, res, next) => {
  const table = await Table.findById(req.params.id);
  if (!table) {
    return next(new ErrorHandler('Table not found', 404));
  }
  await table.remove();
  res.status(200).json({
    success: true,
    message: 'Table deleted',
  });
});
