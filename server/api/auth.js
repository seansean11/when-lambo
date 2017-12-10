const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator/check');
const User = require('../models/user.model');

module.exports = (router) => {
  router.post('/login', [
    body('email').trim().normalizeEmail().isEmail(),
    body('password', 'passwords must be at least 6 characters long').isLength({ min: 6 })
  ], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.mapped() });
    }

    new User({ email: req.body.email })
      .fetch()
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: 'error finding user' });
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
          if (err || !isMatch) {
            return res.status(401).json({ message: 'error comparing password' });
          }

          const payload = { id: user.id };
          const token = jwt.sign(payload, config.get('secret'));

          res.status(200).send({ user, token });
        });
      })
      .catch(err => next(err));
  });

  return router;
};
