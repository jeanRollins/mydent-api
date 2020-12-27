const { QueryExec } = require('../libs/database') ;


const GetPatientByField = async ( value , field = 'rut' )  =>  {
    const query  = `SELECT p.*, pf.*, pr.name as name_prevision FROM pacientes p 
                    INNER JOIN pacientes_ficha pf ON pf.rut = p.rut 
                    INNER JOIN prevision pr ON p.prevision  = pr.id 
                    WHERE p.${ field } = '${ value }' 
                    AND p.estado = 1 ` ;
    const result = await QueryExec( query ) ;
    return ( result.length > 0 ) ? result[0] : {} ;
}

const PatientValidRut = async rut   =>  {
    rut = rut.replace('-' , '' ) ;
    const query  = `SELECT * FROM pacientes WHERE rut ='${ rut }'` ;
    const result = await QueryExec( query ) ;
    return ( result.length < 1 )  ;
}

const PatientValidEmail = async email   =>  {
    const query  = `SELECT * FROM pacientes WHERE correo ='${ email }'` ;
    const result = await QueryExec( query ) ;
    return ( result.length < 1 )  ;
}

const GetPatientByUser = async rut  =>  {
    rut = rut.replace('-' , '' ) ;

    const query  = `SELECT p.*, pf.* , pr.name as name_prevision  FROM usuario_pacientes up 
                    INNER JOIN pacientes p ON p.rut = up.rut_paciente 
                    INNER JOIN pacientes_ficha pf ON pf.rut = up.rut_paciente 
                    INNER JOIN prevision pr ON p.prevision = pr.id
                    WHERE up.rut_usuario='${ rut }' ` ;
    const result = await QueryExec( query ) ;
    return ( result.length > 0 ) ? result : [] ;
}


const AddPatient = async  ( name , lasnameMother ,lasnameFather ,prevision ,rut ,mail , born )  => {
    rut = rut.replace('-' , '') ;

    const query = `INSERT INTO pacientes ( nombres, apellido_materno, apellido_paterno, prevision, rut, correo, fecha_nacimiento, estado, creado )  
                    VALUES
                    ( '${name}', '${ lasnameMother }', '${lasnameFather}', ${prevision}, '${rut}', '${mail}', '${born}' , 0, now() )` ;
    const result = await QueryExec( query ) ;
    
    const queryLastId = `SELECT LAST_INSERT_ID() as lastId ;`
    const resultLastId = await QueryExec( queryLastId ) ;

    return ( resultLastId[0].lastId === undefined ) ? false : resultLastId[0].lastId;
}

const AddFile = async  ( rut , groupBlood ,medicaments, height, observations )  => {

    rut = rut.replace('-' , '') ;
    const query = `INSERT INTO pacientes_ficha (rut, grupo_sanguineo, medicamentos, estatura, observaciones)  
                    VALUES
                    ( '${rut}', '${ groupBlood }', '${medicaments}' , '${height}', '${observations}' )` ;

    const  result = await QueryExec( query ) ;
    const queryLastId = `SELECT LAST_INSERT_ID() as lastId ;`
    const resultLastId = await QueryExec( queryLastId ) ;

    return ( resultLastId[0].lastId === undefined ) ? false : resultLastId[0].lastId;
}

const AddPatientUser = async  ( rutUser , rutPatient )  => {
    rutPatient = rutPatient.replace('-' , '') ;
    const query = `INSERT INTO usuario_pacientes (rut_usuario, rut_paciente ) VALUES ( '${rutUser}', '${ rutPatient }' )` ;
    const  result = await QueryExec( query ) ;
    const queryLastId = `SELECT LAST_INSERT_ID() as lastId ;`
    const resultLastId = await QueryExec( queryLastId ) ;
    return ( resultLastId[0].lastId === undefined ) ? false : resultLastId[0].lastId;
}

const GetForecasts = async () => {
    const query = `SELECT * FROM prevision` ;
    const result = await QueryExec( query ) ;
    return  result ;
}

const ValidatePatientExistByUser = async ( field , value ) => {
    value = field == 'rut_paciente' ? value.replace('-' , '') : value ;
    const query = `SELECT * FROM usuario_pacientes WHERE ${ field }='${ value }'`;
    const result = await QueryExec( query ) ;
    return ( result.length < 1 ) 
}



const DeletePatient = async rut  => {
    const query = `DELETE FROM pacientes WHERE rut='${rut}'` ;
    const result = await QueryExec( query ) ;
    return result ;
}

const UpdateField = async  rut  => {
    rut = rut.replace('-' , '') ;
    const query = `UPDATE pacientes SET estado=1 WHERE rut='${rut}'` ;
    const result = await QueryExec( query ) ;
    return result ;
}

const UpdatePatient = async ( name , lasnameMother ,lasnameFather ,prevision, rut ,mail , born)  => {
    rut = rut.replace('-' , '') ;
    const query = `UPDATE pacientes 
                   SET nombres='${name}', apellido_materno='${ lasnameMother }',
                   apellido_paterno='${lasnameFather}', prevision=${prevision},
                   correo='${ mail }', fecha_nacimiento='${ born }' 
                   WHERE rut='${rut}' ;` ;
    const result = await QueryExec( query ) ;
    return  result ;
}

const UpdateFile = async  ( rut , groupBlood ,medicaments, height, observations )  => {

    rut = rut.replace('-' , '') ;
    const query = `UPDATE  pacientes_ficha 
                    SET 
                    grupo_sanguineo='${ groupBlood }' , 
                    medicamentos ='${medicaments}' ,
                    estatura ='${height}' ,
                    observaciones ='${observations}' 
                    WHERE rut='${rut}' ;` ;

    const result = await QueryExec( query ) ;
    return result;
}



const SearchPatientsUsers = async ( rutUser , value , field = 'rut_paciente' )  =>  {
    rutUser  =  rutUser.replace('-' , '' ) ;
    value    =  value.replace('-' , '' ) ;

    const query  = `SELECT p.*, pr.name as name_prevision  FROM usuario_pacientes up 
                    INNER JOIN pacientes p ON p.rut = up.rut_paciente 
                    INNER JOIN pacientes_ficha pf ON pf.rut = up.rut_paciente 
                    INNER JOIN prevision pr ON p.prevision = pr.id
                    WHERE 
                    up.rut_usuario = '${ rutUser }' AND
                    up.${ field } LIKE '%${ value }%'` ;
    const result = await QueryExec( query ) ;
    return ( result.length > 0 ) ? result : [] ;
}

const updatePatientStateModel = async rut =>{
    rut = rut.replace( '-' , '' ) ;
    const query = `UPDATE pacientes SET estado = 0 WHERE rut = '${rut}'`;
    console.log('query' , query)
    const result = await QueryExec(query);
    return result;
}
                    

module.exports = {
    GetPatientByField ,
    AddPatient ,
    AddFile ,
    DeletePatient ,
    GetPatientByUser ,
    PatientValidRut ,
    PatientValidEmail ,
    AddPatientUser ,
    UpdateField ,
    GetForecasts ,
    ValidatePatientExistByUser ,
    UpdatePatient,
    UpdateFile ,
    SearchPatientsUsers ,
    updatePatientStateModel
}