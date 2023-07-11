const express = require('express');
const {
  createChinese,
  findAllChinese,
  findSingleChinese,
  updateChinese,
  deleteChinese,
} = require('../../controllers/AdminControllers/chineseController');

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require('../../middleware/auth');

const router = express.Router();

router
  .route('/chinese')
  .post(isAuthenticatedUser, authorizeRoles('admin'), createChinese)
  .get(isAuthenticatedUser, authorizeRoles('admin'), findAllChinese);
router
  .route('/chinese/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), findSingleChinese)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateChinese)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteChinese);

module.exports = router;
