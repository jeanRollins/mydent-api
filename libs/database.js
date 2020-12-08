const mysql = require('mysql') ;
require ('custom-env').env('staging') ;
const util = require('util');

const conn = mysql.createConnection({

});

const query = util.promisify(conn.query).bind(conn);

const QueryExec =  async sql  => {

    const result    =  await query( sql ) ;
    const response  =  Object.values( JSON.parse( JSON.stringify( result ) ) ) ;
    return response ;
}

module.exports = { QueryExec } ;	
