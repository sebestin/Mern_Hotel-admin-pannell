const express = require('express');
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require('../../middleware/auth');
const {
  createPizza,
  findAllPizza,
  daletePizza,
  updatePizza,
  findSinglePizza,
} = require('../../controllers/AdminControllers/pizzaController');

const router = express.Router();

router
  .route('/pizza')
  .post(isAuthenticatedUser, authorizeRoles('admin'), createPizza)
  .get(findAllPizza);

router
  .route('/pizza/:id')
  .get(findSinglePizza)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updatePizza)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), daletePizza);

module.exports = router;
