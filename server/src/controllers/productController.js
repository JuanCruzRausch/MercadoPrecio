const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  if (!products) {
    next(new AppError('No product found', 404));
  }

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});

exports.getRandomProduct = catchAsync(async (req, res, next) => {
  const products = await Product.aggregate([
    { $set: { random: { $rand: {} } } },
    { $sort: { random: 1 } },
  ]);

  if (!products || products.length === 0) {
    next(new AppError('No products found', 404));
  }

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});
