
const { QueryExec } = require('../libs/database');
const { encrypt  } = require('../libs/Encrypt') ;
const { GetLastId } = require('./Model');

const AddHistory = async ( rutUser, rutPatient , tooth, history  ) => {
    
    const historyEncrypt = encrypt( history ) ;
    const query = `INSERT INTO historial 
                    (rut_usuario, rut_paciente, diente, fecha, historial) 
                    VALUES 
                    ('${rutUser}', '${rutPatient}', ${tooth}, now(), '${historyEncrypt}');`;
    const result = await QueryExec(query);
    const lastId = await GetLastId() ;
    return  lastId ;
}

const GetHistory = async ( rutUser , rutPatient ) => {
    const query = `SELECT * FROM historial WHERE rut_usuario = '${ rutUser }' AND rut_paciente = '${ rutPatient }'`;
    const result = await QueryExec(query);
    return  ( result.length > 0 ) ? result : []  ;
}

module.exports = { AddHistory , GetHistory } ;