const { Pool } = require('pg');

const dataBaseUrl =
    process.env.DATABASE_URL ||
    'postgresql://ben:secret123@localhost:5432/one_movies';

// Enable SSL in production and for managed DBs (e.g., Render)
const enableSSL =
    process.env.NODE_ENV === 'production' ||
    /render\.com|vercel\.db|neon\.tech|supabase\.co/i.test(
        process.env.DATABASE_URL || ''
    );

const pool = new Pool({
    connectionString: dataBaseUrl,
    ssl: enableSSL
        ? { rejectUnauthorized: false }
        : false,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
