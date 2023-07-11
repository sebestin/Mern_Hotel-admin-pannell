const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();
const errorMiddleware = require('./middleware/error');

const {
  createOrder,
  findAllOrder,
  findSingleOrder,
  updateOrder,
  deleteSingleOrder,
} = require('./controllers/AdminControllers/orderController');

// Config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({ path: 'backend/config/config.env' });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
const router = express.Router();

// Route Imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const snack = require('./routes/AdminRoutes/snacksRoute');
const chinese = require('./routes/AdminRoutes/chineseRoute');
const indian = require('./routes/AdminRoutes/indianRoute');
const pizza = require('./routes/AdminRoutes/pizzaRoute');
const table = require('./routes/AdminRoutes/tableRoute');
const drinks = require('./routes/AdminRoutes/drinksRoute');

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', snack);
app.use('/api/v1', chinese);
app.use('/api/v1/', indian);
app.use('/api/v1', pizza);
app.use('/api/v1', table);
app.use('/api/v1', drinks);

// --------------------------------------------------------------->>>>>>>  Admin Menu Table routes

// route.post('/srchadmin', createAdminMenuData);

// route.get('/srchadmin', findAllAdminMenuData);

// Search Table

router.get('/srchadmin/:key', async (req, resp) => {
  console.log('------------------------>>>>>>>>> New Key', req.params.key);
  let data = await adminTable.findOne({
    $or: [{ tablenum: { $regex: req.params.key } }],
  });
  resp.send(data);
});

// route.get("/srchadmin/:key", async (req, resp) => {
  // console.log("------------------------>>>>>>>>> New Key", req.params.key)
//   let data = await adminTable.findOne(
//     {
//       "$or": [
//         { tablenum: { $regex: req.params.key } }
//       ]
//     }
//   )
//   resp.send(data)
// })

// Search Table
// route.put('/srchadmin/:adminTableId', updateAdminMenuData);

// route.delete('/srchadmin/:adminTableId', deleteSingleAdminMenuData);
// ---------------------------------------------------------------<<<<<<  Admin Menu Table routes

// --------------------------------------------------------------->>>>>>> Order for trial routes

router.post('/order', createOrder);

router.get('/order', findAllOrder);

// route.get('/order/:orderId', findSingleOrder);

// Order.get("/searchorder/:key", async (req, res) => {
//   // console.log(req.params.tablenum)
//   let result = await orderPage.find({
//     "$or": [
//       {
//         tablenum: { $regex: req.params.key }
//       }
//     ]
//   });
//   res.send(result);

// })

router.put('/order/:orderId', updateOrder);

router.delete('/order/:orderId', deleteSingleOrder);
// --------------------------------------------------------------<<<<<<<< Order  routes

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
