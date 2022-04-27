const mysql = require('mysql') ;
require ('custom-env').env('staging') ;
const util = require('util');

const conn = mysql.createConnection({
    host     : "",
    user     : "",
    password : "" ,
    database : ""
});

const query = util.promisify(conn.query).bind(conn);

const QueryExec =  async sql  => {
    sql = sql.replace(/(\r\n\t|\n|\r\t)/, "") ;
    sql = sql.replace('\n', "") ;
    
    const result    =  await query( sql ) ;
    const response  =  Object.values( JSON.parse( JSON.stringify( result ) ) ) ;
    return response ;
}

module.exports = { QueryExec } ;	
