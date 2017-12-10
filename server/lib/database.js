const config = require('config');
const knex = require('knex')(config.db);
const db = require('bookshelf')(knex);

db.plugin('visibility');
db.plugin('registry');
db.plugin('virtuals');

module.exports = db;
