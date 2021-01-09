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
    const query = ` SELECT  id , rut_usuario, rut_paciente, url, titulo, descripcion, token ,
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

const GetDicomDataByPatient = async  token  => {
    const query = ` SELECT  
                    d.id as id_dicom , d.rut_usuario as rut_user, d.rut_paciente as rut_patient, d.url, d.titulo as title, d.descripcion as description, d.token as token ,
                    CONCAT( DATE_FORMAT( date, '%d-%m-%Y' ) , ' ' , DATE_FORMAT( date, '%H:%i:%s' ) ) as file_created,
                    CONCAT( p.nombres , ' ' , p.apellido_paterno, ' ' , p.apellido_materno ) as name, DATE_FORMAT( p.fecha_nacimiento, '%d-%m-%Y' ) as born
                    FROM dicom d 
                    INNER JOIN pacientes p ON d.rut_paciente = p.rut
                    WHERE d.token = '${ token }'` ;
    const  result  =  await QueryExec( query ) ;
    return result ;
}

module.exports = { AddDicom , GetFileByPatient, DeleteFileDicom, GetDicomDataByPatient } ;
