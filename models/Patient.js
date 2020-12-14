const { QueryExec } = require('../libs/database') ;

const GetPatients = async () => {
    let result = await QueryExec(`SELECT * FROM pacientes p INNER JOIN pacientes_ficha pf ON p.rut = pf.rut`) ;
    return result ;
}

const GetPatientByField = async ( value , field = 'rut' ) => {
    const query = `SELECT * FROM pacientes p INNER JOIN pacientes_ficha pf ON p.rut = pf.rut WHERE ${field} = '${ value }' ` ;
    const result = await QueryExec( query ) ;

    
    return ( result.length > 0 ) ? result : [] ;
}

const AddPatient = async  patient  => {
    const query = `INSERT INTO pacientes ( names, apellido_materno, apellido_paterno, prevision, rut, correo, fecha_nacimiento )  
                    VALUES
                    ( '${patient.name}', '${patient.lasnameMother}', '${patient.lasnameFather}', ${patient.prevision}, '${patient.rut}', '${patient.mail}', '${patient.born}' )` ;
    const result = await QueryExec( query ) ;
    
    const queryLastId = `SELECT LAST_INSERT_ID() as lastId ;`
    const resultLastId = await QueryExec( queryLastId ) ;

    return resultLastId ;
}

const DeletePatient = async rut  => {
    const query = `DELETE FROM pacientes WHERE rut='${rut}'` ;
    const result = await QueryExec( query ) ;
    return result ;
}

const DeletePatientFile = async rut  => {
    const query = `DELETE FROM pacientes_ficha WHERE rut='${rut}'` ;
    const result = await QueryExec( query ) ;
    return result ;
}

module.exports = {
    GetPatients ,
    GetPatientByField ,
    AddPatient ,
    DeletePatient ,
    DeletePatientFile
}