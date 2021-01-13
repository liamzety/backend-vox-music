const Pool = require('pg').Pool;

// const pool = new Pool({
//     user: 'postgres',
//     password: 'dragond1',
//     host: 'localhost',
//     port: 5432,
//     database: 'vox'
// })

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
})

module.exports = pool;