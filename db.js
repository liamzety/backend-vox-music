const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'dragond1',
    host: 'localhost',
    port: 5432,
    database: 'template'
})

module.exports = pool;