const { QueryExec } = require('../libs/database');

const GetLastId = async () => {
    const queryLastId = `SELECT LAST_INSERT_ID() as lastId ;`
    const lastId = await QueryExec( queryLastId ) ;
    return lastId
}

module.exports = { GetLastId } ;

