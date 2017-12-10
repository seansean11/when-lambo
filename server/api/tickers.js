const request = require('request-promise');

const hitbtc = request({ uri: 'https://api.hitbtc.com/api/2', forever: true });

module.exports = (router) => {
  router.get('/tickers', (req, res) => {
    hitbtc.get('/api/2/public/ticker/BTCETH')
      .then((data) => {
        res.json({ data });
      });
  });

  return router;
};
