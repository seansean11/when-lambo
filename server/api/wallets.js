module.exports = (router) => {
  router.get('/me', (req, res) => {
    res.json({
      timestamp: Date.now(),
      uptime: process.uptime()
    });
  });

  return router;
};
