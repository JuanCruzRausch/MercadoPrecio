const Score = require('../models/scoreModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.postScore = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(
      new AppError(
        'There is no user found with the token or you are not loggued in',
        404,
      ),
    );
  }

  const score = await Score.create({
    userId: user._id,
    score: req.body.score,
  });

  res.status(200).json({
    status: 'success',
    data: {
      score,
    },
  });
});

exports.getAllScores = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Score.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const scores = await features.query.populate({
    path: 'userId',
    select: 'name surname photo',
  });

  const totalScores = await Score.find();

  res.status(200).json({
    status: 'success',
    total: totalScores.length,
    results: scores.length,
    data: {
      scores,
    },
  });
});

exports.getUserScores = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Score.find({ userId: req.params.id }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const scores = await features.query.populate({
    path: 'userId',
    select: 'name surname photo',
  });

  if (!scores) {
    return next(
      new AppError('No se encontraron scores para este usuario.', 404),
    );
  }

  const totalScores = await Score.find({ userId: req.params.id });

  res.status(200).json({
    status: 'success',
    total: totalScores.length,
    results: scores.length,
    data: {
      scores,
    },
  });
});
