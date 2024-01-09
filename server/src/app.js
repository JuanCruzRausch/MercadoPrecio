const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const scoreRouter = require('./routes/scoreRouter');

const app = express();

// security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// limit request from same IP
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'To many requests from this IP, please try again in an hour',
// });

// app.use('/api', limiter);

// Data sanitization NoSQL injection
app.use(mongoSanitize());

// Data sanitization
app.use(xss());

// Prevent parameter pollution
// app.use(hpp({
//   whitelist: ['price', 'etc']
// }))

// Body parser
app.use(express.json({ limit: '10kb' }));

// Serving static files
app.use(express.static(`${__dirname}/public`));

// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Configuración CORS con opciones específicas
const corsOptions = {
  origin: process.env.CLIENT_DOMAIN,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

// Aplica la configuración CORS antes de definir rutas
app.use(cors(corsOptions));

app.use('/api/v1/product', productRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/score', scoreRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
