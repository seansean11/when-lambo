require('dotenv').config();

// --------------------------------------------------
// Packages
// --------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const passport = require('passport');
const logger = require('./lib/logger');
const api = require('./api');

const app = express();
const router = express.Router();
const port = process.env.PORT || 3001;

// --------------------------------------------------
// Middleware & Services
// --------------------------------------------------
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(expressValidator());
app.use(passport.initialize());


if (app.get('env') !== 'test') {
  app.use(morgan('combined', { stream: logger.stream }));
}

// --------------------------------------------------
// Routes
// --------------------------------------------------
app.use('/api', api(router));

// --------------------------------------------------
// Error Handlers
// --------------------------------------------------

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  console.log('hi');
  app.use((err, req, res, next) => {
    console.log('hi');
    res.status(err.status || 500).json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  console.log('hi');
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

// --------------------------------------------------
// Start the show
// --------------------------------------------------
const server = app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});

module.exports = server;
