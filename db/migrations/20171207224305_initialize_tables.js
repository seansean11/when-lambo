
exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('first_name');
      table.string('last_name');
      table.string('password');
      table.string('email');
      table.timestamps();
    })
  ]);

exports.down = knex =>
  knex.schema.dropTable('users');
