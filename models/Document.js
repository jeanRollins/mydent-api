
const { QueryExec } = require('../libs/database');


const AddDocumentModel = async document => {

    const query = `INSERT INTO documentos ( url, descripcion, tipo, rut_usuario, rut_paciente, nombre, created )  VALUES (  '${document.url}' , '${document.description}', '${document.type}' , '${document.rutUser}' , '${document.rutPacient}', '${document.name}', now() ) ; `;
    const result = await QueryExec(query);
}

const getAllDocumentByUserAndPacient = async ruts => {
    const query = `SELECT * FROM documentos WHERE rut_usuario = '${ruts.rutUser}' AND rut_paciente = '${ruts.rutPacient}'`;
    const result = await QueryExec(query);
    return result;
}


module.exports = { AddDocumentModel,getAllDocumentByUserAndPacient } 