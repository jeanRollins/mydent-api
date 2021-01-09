const { generateTokenAccess } = require('../libs/Commons');
const { QueryExec } = require('../libs/database') ;
const { GetLastId } = require('./Model');

const AddDicom = async  ( rutUser , rutPatient , url, title, description )  => {
    let token = await generateTokenAccess() ;
    const query = ` INSERT INTO dicom 
                    (rut_usuario, rut_paciente, url, date, titulo, descripcion, token) 
                    VALUES 
                    ( '${rutUser}', '${rutPatient}', '${url}', now() ,  '${title}', '${description}', '${ token }' )` ;
    const  result  =  await QueryExec( query ) ;
    const  lastId  =  await GetLastId() ;
    
    return lastId[0].lastId ;
}

const GetFileByPatient = async  ( rutUser , rutPatient )  => {
    const query = ` 
                    SELECT  id , rut_usuario, rut_paciente, url, titulo, descripcion, token ,
                    CONCAT( DATE_FORMAT( date, '%d-%m-%Y' ) , ' ' , DATE_FORMAT( date, '%H:%i:%s' ) ) as created 
                    FROM dicom 
                    WHERE rut_usuario = '${rutUser}' 
                    AND  rut_paciente = '${rutPatient}'` ;
    const  result  =  await QueryExec( query ) ;
    return result ;
}

const DeleteFileDicom = async id  => {
    const query = ` DELETE FROM dicom WHERE id = ${ id }` ;
    const  result  =  await QueryExec( query ) ;
    return result ;
}

module.exports = { AddDicom , GetFileByPatient, DeleteFileDicom } ;
