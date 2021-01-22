const Pool = require('pg').Pool;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.DATABASE_URL_DEV,
    ssl: false
})
pool.connect();

module.exports = pool;