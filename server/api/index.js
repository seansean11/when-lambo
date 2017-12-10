const { name, version } = require('../../package.json');
const auth = require('./auth');
const transactions = require('./transactions');
const tickers = require('./tickers');
const balances = require('./balances');

module.exports = (router) => {
  router.get('/', (req, res) => {
    res.json({
      name,
      version,
      timestamp: Date.now(),
      uptime: process.uptime()
    });
  });

  router.use('/auth', auth(router));
  router.use('/transactions', transactions(router));
  router.use('/tickers', tickers(router));
  router.use('/balances', balances(router));
  return router;
};
