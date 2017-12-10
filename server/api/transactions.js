module.exports = (router) => {
  router.get('/transactions/:userId', (req, res) => {
    res.json({
      timestamp: Date.now(),
      uptime: process.uptime()
    });
  });

  return router;
};
