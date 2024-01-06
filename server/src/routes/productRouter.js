const express = require('express');
const productController = require('../controllers/productController');

const productRouter = express.Router();

productRouter.get('/', productController.getAllProducts);
productRouter.get('/rand', productController.getRandomProduct);

module.exports = productRouter;
