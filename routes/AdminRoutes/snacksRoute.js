const express = require('express');
const {
  createSnack,
  findAllSnack,
  findSingleSnack,
  updateSnack,
  deleteSingleSnack,
} = require('../../controllers/AdminControllers/snackController');
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require('../../middleware/auth');

const router = express.Router();
router
  .route('/snacks')
  .post(isAuthenticatedUser, authorizeRoles('admin'), createSnack)
  .get(isAuthenticatedUser, authorizeRoles('admin'), findAllSnack);
router
  .route('/snack/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), findSingleSnack)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateSnack)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteSingleSnack);

module.exports = router;
