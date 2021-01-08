const { AddDicom , GetFileByPatient, DeleteFileDicom } = require("../models/Dicom");

const AddDicomFile = async ( req , res ) => {
    
    let response = { message : 'ok' , action : true } ;

    try {

        const { rutUser , rutPatient , url, title, description }  = req.body ;

        if ( !rutUser || rutUser === undefined ){
            response.message = 'rutUser required.';
            response.action = false;
            res.send( response ) ;
            return false ;
        }

        if ( !rutPatient || rutPatient === undefined ){
            response.message = 'rutPatient required.';
            response.action = false;
            res.send( response ) ;
            return false ;
        }

        if ( !url || url === undefined ){
            response.message = 'url required.';
            response.action = false;
            res.send( response ) ;
            return false ;
        }

        if ( !title || title === undefined ){
            response.message = 'title required.';
            response.action = false;
            res.send( response ) ;
            return false ;
        }

        if ( !description || description === undefined ){
            response.message = 'description required.';
            response.action = false;
            res.send( response ) ;
            return false ;
        }
        
        const responseAdd = await AddDicom( rutUser , rutPatient , url, title, description ) ;

        if( !responseAdd ){
            res.send( { action: false , message : 'Problem to save file'} ) ;
            return false ;
        }

        res.send( response ) ;
    } 
    catch ( error ) {
        res.send( { 
            action: false ,
            message : error 
        } ) 
    }    
}

const GetFilesDicomByPatient = async ( req , res ) => {
    
    let response = { message : 'ok' , action : true } ;

    try {

        const { rutUser , rutPatient }  = req.body ;

        if ( !rutUser || rutUser === undefined ){
            response.message = 'rutUser required.';
            response.action = false;
            res.send( response ) ;
            return false ;
        }

        if ( !rutPatient || rutPatient === undefined ){
            response.message = 'rutPatient required.';
            response.action = false;
            res.send( response ) ;
            return false ;
        }
        
        const filesFounded = await GetFileByPatient( rutUser , rutPatient ) ;
        response.data = filesFounded ;

        res.send( response ) ;
    } 
    catch ( error ) {
        res.send( { 
            action: false ,
            message : error , 
            data : []
        } ) 
    }    
}

const DeleteDicom = async ( req , res ) => {
    
    let response = { message : 'ok' , action : true } ;

    try {

        const { id }  = req.body ;

        if ( !id || id === undefined ){
            response.message = 'id required.';
            response.action = false;
            res.send( response ) ;
            return false ;
        }
        
        const responseDelete = await DeleteFileDicom( id ) ;
        res.send( response ) ;
    } 
    catch ( error ) {
        res.send( { 
            action: false ,
            message : error 
        } ) 
    }    
}

module.exports = { AddDicomFile, GetFilesDicomByPatient , DeleteDicom } ;