module.exports = (router) => {
  router.get('/tickers', (req, res) => {


    res.json({
      timestamp: Date.now(),
      uptime: process.uptime()
    });
  });

  return router;
};
