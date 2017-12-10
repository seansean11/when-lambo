const { name, version } = require('../../package.json');
const auth = require('./auth');
const transactions = require('./transactions');

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
  return router;
};
