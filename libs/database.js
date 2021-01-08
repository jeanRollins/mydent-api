const mysql = require('mysql') ;
require ('custom-env').env('staging') ;
const util = require('util');

const conn = mysql.createConnection({
    host     : "alohaweb.tk",
    user     : "alohaweb_dev",
    password : "Holamundo159*" ,
    database : 'alohaweb_mydent'
});

const query = util.promisify(conn.query).bind(conn);

const QueryExec =  async sql  => {
    sql = sql.replace(/(\r\n\t|\n|\r\t)/, "") ;
    sql = sql.replace('\n', "") ;
    sql = sql.replace("'", " ") ;

    const result    =  await query( sql ) ;
    const response  =  Object.values( JSON.parse( JSON.stringify( result ) ) ) ;
    return response ;
}

module.exports = { QueryExec } ;	
