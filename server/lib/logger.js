const winston = require('winston');

const transports = [
  new winston.transports.Console({
    level: 'debug',
    json: false,
    timestamp: true,
    colorize: true,
    label: process.env.NODE_ENV,
    handleExceptions: true,
    humanReadableUnhandledException: true
  }),
];

const logger = new winston.Logger({ transports, exitOnError: false });

module.exports = logger;
module.exports.stream = {
  write(message) {
    logger.info(message);
  }
};
