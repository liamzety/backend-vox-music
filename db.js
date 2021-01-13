const Pool = require('pg').Pool;

// const pool = new Pool({
//     user: 'postgres',
//     password: 'dragond1',
//     host: 'localhost',
//     port: 5432,
//     database: 'vox'
// })

const pool = new Pool({
    user: 'irjeucgnbzlcra',
    password: 'd19966227b517dfa1e121f1976b997d6c88eed6adb64382af421c0ec40e8e3b2',
    host: 'ec2-34-248-148-63.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'vox'
})

module.exports = pool;