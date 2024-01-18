const express = require('express');
const tourCtrl = require('../controllers/tourController');
//const { getAllproducts, createProduct, getProduct, updateProduct, deletProduct } = require('../controllers/productController');
const router = express.Router();

//router.param('id', tourCtrl.checkProductID);

router.route('/tour-states')
    .get(tourCtrl.getTourStates);

router.route('/monthly-plan/:year')
    .get(tourCtrl.getMonthlyPlan);

router.route('/top-5-tours')
    .get(tourCtrl.aliasTopTours, tourCtrl.getTours);

router.route('/')
    .get(tourCtrl.getTours)
    .post(tourCtrl.createTour);
router.route('/:id')
    .get(tourCtrl.getTour)
    .patch(tourCtrl.updateTour)
    .delete(tourCtrl.deleteTour);

module.exports = router;