const config = require('config');
const { getTickerPrice } = require('../lib/market-data');

const symbolWhitelist = config.get('currencies');

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

  router.get('/tickers/:symbol', (req, res, next) => {
    const { symbol } = req.params;

    if (!symbolWhitelist.includes(symbol)) {
      return res.status(404).json({ messsage: `${symbol} is not a supported currency pair` });
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
