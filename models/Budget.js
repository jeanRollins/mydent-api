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
    const query = ` SELECT * FROM presupuestos_tratamientos pt INNER JOIN especialidades_tratamiento et ON et.id = pt.id_tratamiento WHERE pt.rut_usuario = '${rut}';` ;
    const result = await QueryExec( query ) ;
    return result ;
}




module.exports = {
    AddItem , 
    DeleteItem , 
    GetItems
}