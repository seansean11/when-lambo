exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id');
      table.string('first_name');
      table.string('last_name');
      table.string('password');
      table.string('email');
      table.timestamps();
    }),
    knex.schema.createTable('transactions', (table) => {
      table.increments('id');
      table.integer('user_id').references('id').inTable('users');
      table.decimal('USD', 18, 2).defaultTo(0);
      table.decimal('BTC', 18, 18).defaultTo(0);
      table.decimal('ETH', 18, 18).defaultTo(0);
      table.decimal('LTC', 18, 18).defaultTo(0);
      table.decimal('DOGE', 18, 18).defaultTo(0);
      table.timestamps();
    }).createTable('transactions_meta', (table) => {
      table.increments('id');
      table.integer('transaction_id').references('id').inTable('transactions');
      table.string('symbol');
      table.string('side');
      table.string('price');
      table.timestamps();
    })
  ]);

exports.down = knex =>
  knex.schema.dropTable('transactions_meta')
    .dropTable('transactions')
    .dropTable('users');
