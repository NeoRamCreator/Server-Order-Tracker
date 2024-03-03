const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "test2",
    port: 5432,
    password: 'admin',
})

module.exports = pool;