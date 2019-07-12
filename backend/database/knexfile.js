require('dotenv').config({
  path: '../.env',
});

const {
  TEST_DB_SERVER,
  TEST_DB_PORT,
  TEST_DB_NAME,
  TEST_DB_USER,
  TEST_DB_PASSWORD,
} = process.env;

module.exports = {
  
  development: {
    client: 'mysql',
    connection: {
      host: TEST_DB_SERVER,
      database: TEST_DB_NAME,
      user: TEST_DB_USER,
      password: TEST_DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: '',
      database: '',
      user:     '',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

};
