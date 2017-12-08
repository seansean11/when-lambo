const CONFIG = require('config');
const knex = require('knex')(CONFIG.db);
const db = require('bookshelf')(knex);

module.exports = db;
