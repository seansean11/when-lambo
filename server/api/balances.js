const passport = require('passport');
const config = require('config');
const { param, validationResult } = require('express-validator/check');
const Transaction = require('../models/transaction.model');

const currencyWhitelist = config.get('currencies');

module.exports = (router) => {
  router.get('/balances', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    new Transaction()
      .query((qb) => {
        qb.where({ user_id: req.user.id });
        currencyWhitelist.forEach(currency => qb.sum(`${currency} as ${currency}`));
      })
      .fetchAll()
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  });

  router.get('/balances/:currency', passport.authenticate('jwt', { session: false }), [
    param('currency', 'Currency is not supported').isIn(currencyWhitelist)
  ], (req, res, next) => {
    const errors = validationResult(req);
    const { currency } = req.params;

    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.mapped() });
    }

    new Transaction()
      .query((qb) => {
        qb.where({ user_id: req.user.id });
        qb.sum(`${currency} as ${currency}`);
      })
      .fetchAll()
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  });

  return router;
};
