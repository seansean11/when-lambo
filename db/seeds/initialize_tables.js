// p@ssw0rd = $2a$10$D0awwaG9c.7HXEAxMpepmeJJElKav4CW6D5mmBzWUhZUopTZNJmg6

const users = [
  {
    first_name: 'Ludovoquito',
    last_name: 'Peluche',
    password: '$2a$10$D0awwaG9c.7HXEAxMpepmeJJElKav4CW6D5mmBzWUhZUopTZNJmg6',
    email: 'ludovoquito@peluche.com'
  },
  {
    first_name: 'Bibi',
    last_name: 'Peluche',
    password: '$2a$10$D0awwaG9c.7HXEAxMpepmeJJElKav4CW6D5mmBzWUhZUopTZNJmg6',
    email: 'bibi@peluche.com'
  },
  {
    first_name: 'Junior',
    last_name: 'Peluche',
    password: '$2a$10$D0awwaG9c.7HXEAxMpepmeJJElKav4CW6D5mmBzWUhZUopTZNJmg6',
    email: 'junior@peluche.com'
  }
];

const transactions = [
  {
    user_id: 1,
    USD: '1000.00'
  },
  {
    user_id: 2,
    USD: '1000.00'
  },
  {
    user_id: 3,
    USD: '1000.00'
  }
];


exports.seed = knex =>
  knex('users').del()
    .then(() => knex.insert(users).into('users'))
    .then(() => knex('transactions').del())
    .then(() => knex.insert(transactions).into('transactions'));
