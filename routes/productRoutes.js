const express = require('express');
const pController = require('../controllers/productController');
//const { getAllproducts, createProduct, getProduct, updateProduct, deletProduct } = require('../controllers/productController');
const router = express.Router();

//router.param('id', pController.checkProductID);

router.route('/')
    .get(pController.getAllproducts)
    .post(pController.createProduct);
router.route('/:id')
    .get(pController.getProduct)
    .patch(pController.updateProduct)
    .delete(pController.deletProduct);

module.exports = router;