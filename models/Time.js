const { QueryExec } = require('../libs/database') ;
const { GetLastId } = require('./Model');

const Add = async  ( codTime , rutPatient , rutUser, date, time  )  => {
    const query = `INSERT INTO horas 
                   ( codigo_hora, rut_paciente, rut_usuario, fecha, hora ) 
                   VALUES 
                   ( '${ codTime }', '${ rutPatient }', '${rutUser}', '${date}', '${time}');` ;    
    const result = await QueryExec( query ) ;
    const lastId = await GetLastId() ;
    return lastId[0].lastId ;
}

const AddDetail = async  ( codTime, observation  )  => {
    const query = `INSERT INTO horas_detalle
                   (codigo_hora, observacion, estado) 
                   VALUES 
                   ( '${ codTime }', '${ observation }', 1 );` ;    
    const result = await QueryExec( query ) ;
    return result ;
}

const GetTimesFull = async  ( rutUsuario, since, until )  => {
    
    const query = ` SELECT h.*, hd.* , CONCAT(p.nombres , ' ' , p.apellido_paterno , ' ', p.apellido_materno ) as full_nombre , he.nombre as estado_nombre 
                    FROM horas h 
                    INNER JOIN horas_detalle hd ON hd.codigo_hora = h.codigo_hora 
                    INNER JOIN pacientes p ON p.rut = h.rut_paciente 
                    INNER JOIN horas_estados he ON he.id = hd.estado 
                    WHERE rut_usuario = '${rutUsuario}' 
                    AND fecha >= '${ since }' 
                    AND fecha <= '${ until }' 
                    ORDER BY h.fecha ASC ` ;    
    const result = await QueryExec( query ) ;
    return result ;
}

module.exports = {
    Add , 
    AddDetail , 
    GetTimesFull
}