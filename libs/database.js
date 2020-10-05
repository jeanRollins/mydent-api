const { Pool } = require('pg') ;
require ('custom-env').env('staging') ;

const connectionString =  'postgresql://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@db-postgresql-nyc1-82536-do-user-7621662-0.a.db.ondigitalocean.com:25060/' + process.env.DB_NAME  + '?sslmode=require' ;


const pool = new Pool ({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
})



module.exports = { pool } ;