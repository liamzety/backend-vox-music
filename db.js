const Pool = require('pg').Pool;

// const pool = new Pool({
//     user: 'postgres',
//     password: 'dragond1',
//     host: 'localhost',
//     port: 5432,
//     database: 'vox'
// })
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.DATABASE_URL_DEV,
    ssl: false
})
pool.connect();

module.exports = pool;