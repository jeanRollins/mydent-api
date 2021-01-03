const { QueryExec } = require('../libs/database') ;
const { encrypt } = require('../libs/Encrypt');
const { GetLastId } = require('./Model');


const  Add  =  async ( rutUser, body, name, description, type   )  =>  {
    body = encrypt( body ) ;
    const query  = `INSERT INTO campanas 
                    (rut_usuario, body, nombre, descripcion, tipo, fecha_creado, fecha_lanzamiento, estado) 
                    VALUES 
                    ( '${ rutUser }', '${ body }', '${ name }', '${ description }', '${ type }', now() , '0000-00-00 00:00' , 1 )` ;
    const  result  =  await QueryExec( query ) ;
    const  lastId  =  await GetLastId() ;
    return lastId ;
}

const  AddCampaignPatients  =  async ( idCampaign, rutPatient )  =>  {
    const query  = `INSERT INTO campanas_pacientes 
                    ( id_campana, rut_paciente, fecha, estado) 
                    VALUES 
                    ( '${ idCampaign }', '${ rutPatient }', '0000-00-00 00:00', 0 )` ;
    const  result  =  await QueryExec( query ) ;
    return result ;
}


const GetCampaignsByUser  =  async rutUser  =>  {
    const query  = `SELECT c.* , ce.nombre as nombre_campana FROM campanas c 
                    INNER JOIN campanas_estado ce ON c.estado = ce.id
                    WHERE c.rut_usuario = '${ rutUser }'
                    ORDER BY c.fecha_creado DESC` ;
    const  result  =  await QueryExec( query ) ;
    return result ;
};

const  AddCampaignItem  =  async ( idCampaign, rutPatient )  =>  {
    const query  = `INSERT INTO campanas_pacientes 
                    ( id_campana, rut_paciente, fecha_creacion, estado, fecha_envio) 
                    VALUES 
                    ( ${ idCampaign }, '${ rutPatient }', now(), 1 , '' )` ;
    const  result  =  await QueryExec( query ) ;
    const  lastId  =  await GetLastId() ;
    return lastId[0].lastId ;
}

const  AddItem  =  async ( idCampaign , items )  =>  {  
  
    for ( let item of items ) {
        const response  = await AddCampaignItem( idCampaign, item ) ;
    }; 
    return true ;
}

module.exports = {
    Add,
    AddCampaignPatients ,
    GetCampaignsByUser ,
    AddItem
} ;