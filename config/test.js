module.exports = {
  db: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'db/migrations'
    },
    seeds: {
      directory: 'db/seeds'
    }
  }
};
