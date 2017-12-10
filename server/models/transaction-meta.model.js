const db = require('../lib/database');

const TransactionMeta = db.Model.extend({
  tableName: 'transactions_meta',
  hasTimestamps: true
});

module.exports = db.model('TransactionMeta', TransactionMeta);
