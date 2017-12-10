module.exports = (router) => {
  // router.get('/transactions', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  //   new Transaction().where({ user_id: req.params.userId })
  //     .fetchAll({ withRelated: ['transactionMeta'] })
  //     .then(data => res.status(200).json(data))
  //     .catch(err => next(err));
  // });

  return router;
};
