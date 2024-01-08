const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get(
  '/',
  authController.protect,
  authController.restrictTo('admin'),
  productController.getAllProducts,
);
router.get('/rand', productController.getRandomProduct);

module.exports = router;
