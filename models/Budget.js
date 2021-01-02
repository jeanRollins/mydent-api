const { QueryExec } = require('../libs/database') ;
const { GetLastId } = require('./Model');

const AddItem = async  ( rut , treatment , value  )  => {
    const query = `INSERT INTO presupuestos_tratamientos (rut_usuario, id_tratamiento, valor) VALUES ( '${rut}', ${treatment}, ${value})` ;
    const result = await QueryExec( query ) ;
    return result ;
}

const DeleteItem = async id  => {
    const query = `DELETE FROM presupuestos_tratamientos WHERE id=${id}` ;
    const result = await QueryExec( query ) ;
    return result ;
}

const GetItems = async rut  => {
    const query = ` SELECT pt.id as id_presupuesto, pt.rut_usuario as rut, pt.id_tratamiento as id_tratamiento, pt.valor as valor, e.*, et.*  FROM presupuestos_tratamientos pt INNER JOIN especialidades_tratamiento et ON et.id = pt.id_tratamiento  INNER JOIN especialidades e ON e.id = et.id_especialidad WHERE pt.rut_usuario = '${rut}';` ;
    const result = await QueryExec( query ) ;
    return result ;
}

const GetTratamientByUser  = async rut  => {

    const query = ` SELECT 
                    pt.id as id_presupuesto, pt.valor, pt.rut_usuario, pt.id_tratamiento, 
                    et.id as id_tratamiento, et.class, et.codigo as codigo_tratamiento, et.nombre as nombre_tratamiento, et.type as tipo_tratamiento,
                    e.id  as id_especialidad, e.name as nombre_especialidad, e.codigo as codigo_especialidad 
                    FROM presupuestos_tratamientos pt 
                    INNER JOIN  especialidades_tratamiento et ON et.id = pt.id_tratamiento
                    INNER JOIN  especialidades e ON e.id = et.id_especialidad
                    WHERE pt.rut_usuario = '${ rut }' ` ;

    const result = await QueryExec( query ) ;
    return result ;
}

const CreateBudget = async  ( rutUser, rutPatient )  => {
    const query   =  `INSERT INTO presupuestos 
                     ( rut_paciente, rut_usuario, fecha_creacion, estado ) 
                     VALUES 
                     ( '${rutPatient}', '${rutUser}', now(), 0 )` ;
 
    const result  =  await QueryExec( query ) ;
    const lastId  =  await GetLastId() ;
    return lastId[0].lastId ;
}

const AddItemsBudget = async ( idBudget , items ) => {

    for ( let item of items ) {
        const response  = await CreateBudgetItem( idBudget, item.tooth, item.faceToDent, item.idTratament ) ;
    }
    return true ;
};

const CreateBudgetItem = async  ( idBudget, tooth, faceToDent, idTratament  )  => {
    const query = `INSERT INTO presupuestos_item 
                    (id_prespuesto, diente, cara, id_tratamiento, fecha_realizado, estado ) 
                    VALUES 
                    ( ${idBudget} , ${tooth}, '${faceToDent}', ${idTratament}, '', 1 )` ;
    const result = await QueryExec( query ) ;
    return result ;
}

const UpdateStateBudget = async  ( idBudget, state  )  => {
    const query = `UPDATE presupuestos SET  estado = ${state} WHERE id = ${idBudget}` ;
    const result = await QueryExec( query ) ;
    return result ;
}

const GetItemsByPatient = async ( rutUser , rutPatient ) => {
    const query = `SELECT 
                    p.id as id_budget, p.rut_paciente , p.rut_usuario , p.fecha_creacion as create_budget, p.estado as state_budget ,
                    pi.diente as tooth, pi.cara as face_tooth, pi.id_tratamiento as id_tratament, pi.fecha_realizado as date_completed , pi.estado as state_tratament ,
                    pt.valor as value_tratament ,
                    CONCAT( pat.nombres , ' ' , pat.apellido_paterno, ' ', pat.apellido_materno ) as name ,  DATE_FORMAT( pat.fecha_nacimiento ,'01-%m-%Y')  as born , pat.prevision as prevision_id,
                    pre.name as name_prevision , 
                    et.nombre as name_speciality, et.class as class_speciality, et.type as type_specialty 
                    FROM presupuestos p 
                    INNER JOIN presupuestos_item pi 		  ON p.id    = pi.id_prespuesto
                    INNER JOIN presupuestos_tratamientos pt   ON pt.id   = pi.id_tratamiento
                    INNER JOIN pacientes pat 				  ON pat.rut = p.rut_paciente
                    INNER JOIN prevision pre				  ON pre.id  = pat.prevision
                    INNER JOIN especialidades_tratamiento et  ON et.id   = pt.id_tratamiento
                    WHERE pat.rut = '${ rutPatient}'
                    AND   p.rut_usuario = '${ rutUser }'` ;

    const result = await QueryExec( query ) ;
    return result ;
}

const GetBudgetByPatient = async ( rutUser , rutPatient ) => {
    const query = `SELECT 
                    p.id as id_budget, p.rut_paciente , p.rut_usuario , CONCAT( DATE_FORMAT( p.fecha_creacion, '01-%m-%Y' ) , ' ' , DATE_FORMAT( p.fecha_creacion, '%H:%i:%s' ) ) as create_budget, p.estado as state_budget , 
                    CONCAT( pat.nombres , ' ' , pat.apellido_paterno, ' ', pat.apellido_materno ) as name , DATE_FORMAT( pat.fecha_nacimiento ,'01-%m-%Y') as born , pat.prevision as prevision_id, 
                    pre.name as name_prevision 
                    FROM presupuestos p 
                    INNER JOIN pacientes pat ON pat.rut = p.rut_paciente 
                    INNER JOIN prevision pre ON pre.id = pat.prevision 
                    WHERE pat.rut     = '${ rutPatient }' 
                    AND p.rut_usuario = '${ rutUser }'` ;

    const result = await QueryExec( query ) ;
    return result ;
}

module.exports = {
    AddItem , 
    DeleteItem , 
    GetItems , 
    GetTratamientByUser , 
    CreateBudget , 
    CreateBudgetItem ,
    AddItemsBudget ,
    UpdateStateBudget ,
    GetItemsByPatient ,
    GetBudgetByPatient
}