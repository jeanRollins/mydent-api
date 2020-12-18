const { QueryExec } = require('../libs/database') ;

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




module.exports = {
    AddItem , 
    DeleteItem , 
    GetItems
}