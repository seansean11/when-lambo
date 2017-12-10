const winston = require('winston');

const isDev = process.env.NODE_ENV === 'development';

const transports = [
  new winston.transports.Console({
    level: isDev ? 'debug' : 'info',
    json: false,
    timestamp: true,
    colorize: true,
    label: process.env.NODE_ENV,
    handleExceptions: true,
    humanReadableUnhandledException: true
  })
];

const logger = new winston.Logger({ transports, exitOnError: false });

module.exports = logger;
module.exports.stream = {
  write(message) {
    logger.info(message);
  }
};
