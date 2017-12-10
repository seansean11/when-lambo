const passport = require('passport');
const config = require('config');
const { body, validationResult } = require('express-validator/check');
const Transaction = require('../models/transaction.model');
const TransactionMeta = require('../models/transaction-meta.model');

const symbolWhitelist = config.get('tradingPairs');

function checkAvailableFunds({ currency, amount, id }) {
  return new Transaction()
    .query((qb) => {
      qb.where({ user_id: id });
      qb.sum(currency);
    })
    .fetchAll()
    .then((result) => {
      const { sum } = result.serialize()[0];
      return (parseFloat(sum) + amount) > 0;
    });
}

module.exports = (router) => {
  // @TODO: refactor with better modularity
  router.post('/transactions', passport.authenticate('jwt', { session: false }), [
    body('symbol', 'Currency is not supported').isIn(symbolWhitelist),
    body('side').isIn(['buy', 'sell']),
    body('price').isFloat(),
    body('amount').isFloat()
  ], (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.mapped() });
    }

    const symbols = req.body.symbol.split('-');
    const currencyIn = req.body.side === 'buy' ? symbols[0] : symbols[1];
    const currencyOut = req.body.side === 'buy' ? symbols[1] : symbols[0];
    const amountOut = -Math.abs(req.body.price * req.body.amount);

    checkAvailableFunds({ currency: currencyOut, amount: amountOut, id: req.user.id })
      .then((hasSufficientFunds) => {
        if (!hasSufficientFunds) {
          return res.status(406).json({ message: 'Insufficient funds to perform this operation' });
        }

        const transaction = new Transaction({
          user_id: req.user.id,
          [currencyIn]: req.body.amount,
          [currencyOut]: amountOut
        });

        return transaction.save()
          .then(txn =>
            new TransactionMeta({
              transaction_id: txn.id,
              symbol: req.body.symbol,
              side: req.body.side,
              price: req.body.price
            })
              .save()
              .return(txn.fetch({ withRelated: ['transactionMeta'] })));
      })
      .then(newTxn => res.status(200).json(newTxn))
      .catch(err => next(err));
  });

  router.get('/transactions', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    new Transaction().where({ user_id: req.params.userId })
      .fetchAll({ withRelated: ['transactionMeta'] })
      .then(data => res.status(200).json(data))
      .catch(err => next(err));
  });

  return router;
};
