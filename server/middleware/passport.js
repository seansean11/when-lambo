const passport = require('passport');
const config = require('config');
const { JwtStrategy, ExtractJwt } = require('passport-jwt');
const logger = require('../lib/logger');
const User = require('../models/user.model');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.get('secret')
};

const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
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

passport.use(strategy);
