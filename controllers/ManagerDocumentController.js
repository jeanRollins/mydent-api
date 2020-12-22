
//const { AddDocumentModel } = require('../models/Documents');

const { AddDocumentModel, getAllDocumentByUserAndPacient , DeleteDocument} = require("../models/Document");


const addDocument = async (req, res) => {

    const name = req.param('name');
    const type = req.param('type');
    const description = req.param('description');
    const url = req.param('url');
    const rutUser = req.param('rutUser');
    const rutPacient = req.param('rutPacient');


    const document = {
        name,
        type,
        description,
        url,
        rutUser,
        rutPacient
    };
    
    const responseValidate = await validateData(document);

    if (!responseValidate.action) {
        res.send(responseValidate)
    } 
    else {

        try {
            const responseAdd = await AddDocumentModel( document ) ;
            res.send( {action :true , message: 'ok'} )
            
        } catch (error) {
            res.send( {
                action : false  , 
                message: error
            } )
        }
    }
}


const validateData =  document => {

    let response = {};

    response.message = 'Valid data';
    response.action = true;


    if (document.name === '' || document.name === undefined ||
        document.type === '' || document.type === undefined ||
        document.description === '' || document.description === undefined ||
        document.url === '' || document.url === undefined ||
        document.rutUser === '' || document.rutUser === undefined ||
        document.rutPacient === '' || document.rutPacient === undefined) {
        response.message = 'Object invalid'
        response.action = false
        return response ;
    }
    return response ;
}

const getDocuments = async (req, res) => {

    let response = { message: 'ok', action: true };

    const rutPacient = req.param( 'rutPacient') ;
    const rutUser    = req.param( 'rutUser' ) ;

    if ( !rutPacient || rutPacient === undefined){
        response.message = 'Rut patient required.';
        response.action = false;
        res.send( response ) ;
        return false ;
    }

    if ( !rutUser || rutUser === undefined ){
        response.message = 'Rut user required.';
        response.action = false;
        res.send( response ) ;
        return false ;
    }

    let ruts = { rutPacient ,  rutUser } ;

    try {
        const documents = await getAllDocumentByUserAndPacient(ruts);
        res.send(documents) ;

    } catch (error) {
        res.send({ action: false, message: error })
    }
}

const DestroyDocument = async (req, res)  => {

    const id  = req.param( 'id' ) ;

    if ( !id || id === undefined ) {
        response.message = 'Id document required.';
        response.action = false;
        res.send( response ) ;
        return false ;
    }

    try {
        const response = await DeleteDocument( id );
        res.send({ action : true , message : 'ok' }) ;
    } catch (error) {
        res.send({ action: false, message: error })
    }
}
module.exports = { addDocument, getDocuments , DestroyDocument } ;