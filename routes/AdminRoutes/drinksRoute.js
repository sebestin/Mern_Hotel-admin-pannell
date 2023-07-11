const express = require('express');
const {
  createDrink,
  findAllDrink,
  findSingleDrink,
  updateDrink,
  deleteDrink,
} = require('../../controllers/AdminControllers/drinksController');
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require('../../middleware/auth');

const router = express.Router();

router
  .route('/drink')
  .post(isAuthenticatedUser, authorizeRoles('admin'), createDrink)
  .get(isAuthenticatedUser, authorizeRoles('admin'), findAllDrink);

router
  .route('/drink/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), findSingleDrink)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateDrink)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteDrink);

module.exports = router;

// route.post('/drink', createDrink);

// route.get('/drink/:id', findAllDrink);
