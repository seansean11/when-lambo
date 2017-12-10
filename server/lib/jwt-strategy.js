const config = require('config');
const { Strategy, ExtractJwt } = require('passport-jwt');
const logger = require('../lib/logger');
const User = require('../models/user.model');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get('secret')
};

const strategy = new Strategy(jwtOptions, (jwtPayload, next) => {
  logger.debug('payload received', jwtPayload);

  return new User({ id: jwtPayload.id })
    .fetch()
    .then((user) => {
      if (!user) {
        next(null, false);
      }

      next(null, user);
    });
});

module.exports = strategy;
