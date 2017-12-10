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
      table.decimal('USD', 34, 2).defaultTo(0);
      table.decimal('BTC', 64, 32).defaultTo(0);
      table.decimal('ETH', 64, 32).defaultTo(0);
      table.decimal('LTC', 64, 32).defaultTo(0);
      table.decimal('DOGE', 64, 32).defaultTo(0);
      table.timestamps();
    }).createTable('transactions_meta', (table) => {
      table.increments('id');
      table.integer('transaction_id').references('id').inTable('transactions');
      table.string('symbol');
      table.enum('side', ['buy', 'sell']);
      table.decimal('price', 64, 32);
      table.timestamps();
    })
  ]);

exports.down = knex =>
  knex.schema.dropTable('transactions_meta')
    .dropTable('transactions')
    .dropTable('users');
