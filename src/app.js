const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

//Routes
const userRoutes = require('./routes/user.route');
const queueRoutes = require('./routes/queue.route');

//Error Controller
const globalErrorHandler = require('./controllers/error.controller');

const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use(express.json());
app.use(cors());
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Endpoints
app.use('/api/vi', limiter);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/queue', queueRoutes);

app.all('*', (req, res, next) => {
  return res.status(404).json({
    status: 'error',
    message: `I can't find url:${req.originalUrl} on this server`,
  });
});

app.use(globalErrorHandler);

module.exports = app;
