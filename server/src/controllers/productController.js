const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});

exports.getRandomProduct = async (req, res, next) => {
  try {
    const product = await Product.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(404).json({});
    console.log(error);
  }
};
