const adminTable = require('../../models/AdminModels/adminTable');

// Create a table menu dish
exports.createAdminMenuData = (req, res) => {
  const adminData = new adminTable({
    dish: req.body.dish,
    // price: req.body.price,
    quantity: req.body.quantity,
    tablenum: req.body.tablenum,
  });
  adminData
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

//Find all table menu dish

exports.findAllAdminMenuData = (req, res) => {
  adminTable
  .find({})
    .then((data) => {
      // console.log('Data----------', data);
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

//Find single AdminMenuData
exports.findSingleAdminMenuData = (req, res) => {
  adminTable
    .findById(req.params.adminTableId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

//Update AdminMenuData
// exports.updateAdminMenuData = (req, res) => {
//     adminTable.findByIdAndUpdate(
//         req.params.adminTableId,
//         {
//             dish: req.body.dish,
//             tablenum: req.body.tablenum,
//             quantity: req.body.quantity,
//         },
//         { new: true }
//     )
//         .then((data) => {
//             res.status(200).send(data);
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 message: err.message,
//             });
//         });
// };

exports.updateAdminMenuData = (req, res) => {
  adminTable
    .findByIdAndUpdate(
      req.params.orderId,
      {
        dish: req.body.dish,
        quantity: req.body.quantity,
        tablenum: req.body.tablenum,
      },
      { new: true }
    )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

//Update AdminMenuData

//Delete adminTable
exports.deleteSingleAdminMenuData = (req, res) => {
  adminTable
    .findByIdAndRemove(req.params.adminTableId)
    .then(() => {
      res
        .status(200)
        .send({ message: 'adminTable  item deleted successfully!' });
    })
    .catch((err) => {
      return res.status(404).send({
        message: err.message,
      });
    });
};
