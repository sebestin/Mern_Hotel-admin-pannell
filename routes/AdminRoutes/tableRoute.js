const express = require('express');
const {
  createTable,
  findAllTables,
  findSingleTable,
  updateTable,
  deleteTable,
} = require('../../controllers/AdminControllers/tableController');
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require('../../middleware/auth');

const router = express.Router();

router
  .route('/table')
  .post(isAuthenticatedUser, authorizeRoles('admin'), createTable)
  .get(isAuthenticatedUser, authorizeRoles('admin'), findAllTables);

router
  .route('/table/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), findSingleTable)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateTable)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteTable);

// --------------------------------------------------------------->>>>>>> Routes for table starts

// router.post('/table', createTable);

// router.get('/table', findAllTable);

// router.get('/table/:tableId', findSingleTable);

// router.put('/updateTable/:tableId', updateTable);

// router.delete('/updateTable/:tableId', deleteSingleTable);

// --------------------------------------------------------------->>>>>>> Routes for table Ends

module.exports = router;
