
//const { AddDocumentModel } = require('../models/Documents');


const addDocument = async (req, res) => {


    const name = req.param('name') ;
    const type = req.param('type') ;
    const description = req.param('description') ;
    const file = req.param('imgFile') ;

    const document = {
        name,
        type,
        description,
        file
    } ;

    console.log( 'document*****' , document);
    res.send( document.file[0] ) ;


    //AddDocumentModel(document);

}

module.exports = { addDocument };