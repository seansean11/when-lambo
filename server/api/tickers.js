const config = require('config');
const { param, validationResult } = require('express-validator/check');
const { getTickerPrice } = require('../lib/market-data');

const symbolWhitelist = config.get('tradingPairs');

module.exports = (router) => {
  router.get('/tickers', (req, res, next) => {
    const tickerRequests = symbolWhitelist.map(getTickerPrice);

    Promise.all(tickerRequests)
      .then((prices) => {
        const resArr = prices.map((price, i) => ({
          price,
          symbol: symbolWhitelist[i]
        }));

        return res.status(200).json(resArr);
      })
      .catch(err => next(err));
  });

  router.get('/tickers/:symbol', [
    param('symbol', 'Symbol is not a supported currency pair').isIn(symbolWhitelist)
  ], (req, res, next) => {
    const { symbol } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.mapped() });
    }

    getTickerPrice(symbol)
      .then((price) => {
        res.status(200).json({
          price,
          symbol
        });
      }).catch(err => next(err));
  });

  return router;
};
