const Promise = require('bluebird');
const bcrypt = require('bcrypt');

const dbService = require('services/db.service');
require('models/role.model');
require('models/user-notification.model');

const promiseHash = Promise.promisify(bcrypt.hash);
const promiseSalt = Promise.promisify(bcrypt.genSalt);

const User = dbService.Model.extend({
  tableName: 'user',
  hasTimestamps: true,
  hidden: 'password',
  role() {
    return this.belongsToMany('Role', 'user_role');
  },
  user_notifications() {
    return this.hasMany('UserNotification');
  },
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

module.exports = dbService.model('User', User);
