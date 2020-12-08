const { QueryExec } = require('../libs/database') ;

const GetSpecialty = async () => {
    const query = ' SELECT * FROM especialidades ' ;

    const result = await QueryExec( query );
    return result ;
}

const GetSpecialtyTreatment = async (specialtyId) => {
    const query = `SELECT * FROM especialidades_tratamiento WHERE  id_especialidad=${specialtyId}` ;
    const result = await QueryExec( query );
    return result ;
}


module.exports = { GetSpecialty, GetSpecialtyTreatment } ;



