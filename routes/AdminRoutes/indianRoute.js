const express = require('express');

const {
  createIndianDish,
  findAllIndianDish,
  findSingleIndianDish,
  updateIndianDish,
  deleteIndianDish,
} = require('../../controllers/AdminControllers/indianController');
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require('../../middleware/auth');

const router = express.Router();

router
  .route('/indian-dish')
  .post(isAuthenticatedUser, authorizeRoles('admin'), createIndianDish)
  .get(findAllIndianDish);

router
  .route('/indian-dish/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), findSingleIndianDish)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateIndianDish)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteIndianDish);
// --------------------------------------------------------------->>>>>>>  Indian routes
// router.post('/indian', createIndian);

// router.get('/indian', findAllIndian);

// router.get('/indian/:indianId', findSingleIndian);

// router.put('/indian/:indianId', updateIndian);

// router.delete('/indian/:indianId', deleteSingleIndian);

// ---------------------------------------------------------------<<<<<<  Indian routes

module.exports = router;
