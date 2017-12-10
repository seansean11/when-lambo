const db = require('../lib/database');
const config = require('config');

function dbUp(server, done) {
  db.knex.migrate.latest(config.get('db'))
    .then(() => db.knex.seed.run(config.get('db')))
    .then(() => done());
}

function dbDown(server, done) {
  db.knex.migrate.rollback(config.get('db'))
    .then(() => server.close())
    .then(() => done());
}

module.exports = {
  dbUp,
  dbDown
};
