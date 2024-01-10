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

  // Utiliza populate para incluir la información del usuario relacionado
  const scores = await features.query.populate({
    path: 'userId', // Nombre del campo que contiene la referencia al usuario
    select: 'name surname photo', // Puedes especificar los campos que deseas devolver del usuario
  });

  res.status(200).json({
    status: 'success',
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

  const scores = await features.query;

  if (!scores) {
    return next(
      new AppError('No se encontraron scores para este usuario.', 404),
    );
  }

  // Devolver los scores encontrados
  res.status(200).json({
    status: 'success',
    results: scores.length,
    data: {
      scores,
    },
  });
});
