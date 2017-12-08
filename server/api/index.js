const { name, version } = require('../../package.json');
const users = require('./users');

module.exports = (router) => {
  router.get('/', (req, res) => {
    res.json({
      name,
      version,
      timestamp: Date.now(),
      uptime: process.uptime()
    });
  });

  router.use('/users', users(router));

  return router;
};
