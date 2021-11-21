const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_STRING
});

module.exports = {
    pool,
    query: (text, params, callback) => {
        return pool.query(text, params, callback); 
    },
}