const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const db = require('../lib/database');

const promiseHash = Promise.promisify(bcrypt.hash);
const promiseSalt = Promise.promisify(bcrypt.genSalt);

const User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  hidden: 'password',
  initialize() {
    this.on('creating', this.hashPassword, this);
  },
  hashPassword(model) {
    return promiseSalt(10)
      .then(salt => promiseHash(model.get('password'), salt))
      .then(hash => model.set('password', hash))
      .catch(err => err);
  },
  comparePassword(password, cb) {
    bcrypt.compare(password, this.attributes.password, cb);
  }
});

module.exports = db.model('User', User);
