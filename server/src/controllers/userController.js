const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');

exports.getUserProfile = catchAsync(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(
      new AppError(
        'There is no user found with the token or you are not loggued in',
        404,
      ),
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
