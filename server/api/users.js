module.exports = (router) => {
  router.get('/', (req, res) => {
    res.json({
      timestamp: Date.now(),
      uptime: process.uptime()
    });
  });

  return router;
};
