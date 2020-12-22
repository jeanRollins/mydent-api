const { AddHistory, GetHistory } = require("../models/History");


const AddHistoryPatient = async ( req , res ) => {

    const { rutUser, rutPatient , tooth, history }  = req.body ;
    let response = { message : 'ok' , action : true } ;


    if ( !rutUser || rutUser === undefined ){
        response.message = 'rutUser required.';
        response.action = false;
        res.send( response ) ;
        return false ;
    }

    if ( !rutPatient || rutPatient === undefined ){
        response.message = 'rutUser required.';
        response.action = false;
        res.send( response ) ;
        return false ;
    }
    if ( !tooth || tooth === undefined ){
        response.message = 'tooth  required.';
        response.action = false;
        res.send( response ) ;
        return false ;
    }
    if ( !history || history === undefined ){
        response.message = 'history required.';
        response.action = false;
        res.send( response ) ;
        return false ;
    }

    try {

        const responseAdd = await AddHistory( rutUser, rutPatient, tooth, history ) ;

        if( !responseAdd ){
            res.send( { action: false , message : 'Problem to insert'} ) ;
            return false ;
        }

        res.send( { action: true , message : 'ok'} ) ;
        
    } catch ( error) {
        res.send( { 
            action: false ,
            message : error 
        } ) ;
    }
}

const GetPatientHistory = async ( req , res ) => {

    let response = { message : 'ok' , action : true } ;
    const { rutUser , rutPatient  }  = req.body ;

    if ( !rutUser || rutUser === undefined ){
        response.message = 'rutUser required.';
        response.action = false;
        res.send( response ) ;
        return false ;
    }

    if ( !rutPatient || rutPatient === undefined ){
        response.message = 'rutUser required.';
        response.action = false;
        res.send( response ) ;
        return false ;
    }
   
    try {
        const data = await GetHistory( rutUser, rutPatient ) ;

        if( !data ){
            res.send( { action: false , message : 'Problem to insert'} ) ;
            return false ;
        }
        res.send( { action: true , message : 'ok' , data } ) ;
        
    } catch ( error) {
        res.send( { 
            action: false ,
            message : error 
        } ) ;
    }
}

module.exports = { GetPatientHistory , AddHistoryPatient } ;
