const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

//Routes
const userRoutes = require('./routes/user.route');
const queueRoutes = require('./routes/queue.route');

//Middlewares

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//Endpoints
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/queue', queueRoutes);

app.all('*', (req, res, next) => {
  return res.status(404).json({
    status: 'error',
    message: `I can't find url:${req.originalUrl} on this server`,
  });
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  console.log(err);
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
