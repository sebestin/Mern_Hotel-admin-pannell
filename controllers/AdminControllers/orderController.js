const orderPage = require('../../models/AdminModels/orderModel.js');

// Create an createOrder
exports.createOrder = (req, res) => {
  console.log(req.body);
  const orderData = new Order({
    dish: req.body.dish,
    // price: req.body.price,
    quantity: req.body.quantity,
    tablenum: req.body.tablenum,
  });
  orderData
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

// //Find all Order

exports.findAllOrder = (req, res) => {
  Order.find({})
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

// //Find single Order
exports.findSingleOrder = (req, res) => {
  Order.findById(req.params.orderId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });

  // ---------------------------------------------------New code starts here

  // ---------------------------------------------------New code ends here
};

// //Update Order
exports.updateOrder = (req, res) => {
  Order.findByIdAndUpdate(
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

// //Delete Order
exports.deleteSingleOrder = (req, res) => {
  Order.findByIdAndRemove(req.params.orderId)
    .then(() => {
      res.status(200).send({ message: 'Chineese item deleted successfully!' });
    })
    .catch((err) => {
      return res.status(404).send({
        message: err.message,
      });
    });
};
