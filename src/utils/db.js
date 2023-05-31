const { Pool } = require('pg');
const dataBaseUrl =
    process.env.DATABASE_URL ||
    'postgresql://ben:secret123@localhost:5432/one_movies';
const pool = new Pool({
    connectionString: dataBaseUrl,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
