require('./transaction-meta.model');
const db = require('../lib/database');

const Transaction = db.Model.extend({
  tableName: 'transactions',
  transactionMeta() {
    return this.hasOne('Choice');
  },
  hasTimestamps: true
});

module.exports = db.model('Transaction', Transaction);
