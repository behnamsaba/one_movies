const { Pool } = require('pg');

const pool = new Pool({
  user: 'ben',
  host: 'localhost',
  database: 'one_movies',
  password: 'secret123',
  port: 5432, // default PostgreSQL port
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
