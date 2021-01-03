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

const GetCampaignByUser = async ( idCampaign , rutUser ) =>  {
    const query  = `SELECT 
                    c.* , ce.nombre as nombre_campana 
                    FROM campanas c 
                    INNER JOIN campanas_estado ce ON c.estado = ce.id
                    WHERE c.rut_usuario = '${ rutUser }'
                    AND  c.id = ${ idCampaign }
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

const UpdateStateCampaign = async  ( idCampaign, state ) => {
    const query = `UPDATE campanas  SET estado = ${state}, fecha_lanzamiento = now() WHERE id = ${idCampaign}` ;
    const result = await QueryExec( query ) ;
    return result ;
}

const UpdateStateItem = async  ( idItem, state ) => {
    const query = `UPDATE campanas_pacientes  SET estado = ${state}, fecha_envio = now() WHERE id = ${idItem}` ;
    const result = await QueryExec( query ) ;
    return result ;
}

const GetCampaignAndItems = async () => {
    const query = ` SELECT 
                    c.rut_usuario as rut_user, c.id as id_campaign, c.estado as state_campaign, c.body as body, c.nombre as name_campaign,
                    cp.rut_paciente as rut_patient, cp.estado as state_item, cp.id as id_item, cp.fecha_creacion as item_created,
                    p.correo as email
                    FROM campanas c 
                    INNER JOIN campanas_pacientes cp ON  cp.id_campana   = c.id 
                    INNER JOIN pacientes p			 ON  cp.rut_paciente = p.rut
                    WHERE c.estado = 2 
                    AND cp.estado  = 1
                    ORDER BY c.fecha_creado ASC
                    LIMIT 0, 10` ;

    const result = await QueryExec( query ) ;
    return result ;
}


module.exports = {
    Add,
    AddCampaignPatients ,
    GetCampaignsByUser ,
    AddItem ,
    GetCampaignByUser ,
    UpdateStateCampaign ,
    GetCampaignAndItems ,
    UpdateStateItem
} ;