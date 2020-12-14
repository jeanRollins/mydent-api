const { GetPatientByField, DeletePatient } = require("../models/Patient");


const RemovePatient = async ( req , res ) => {
    
    try {
 
        let response = { } ;
      
        let rut = req.param('rut') ;

        if ( rut == undefined || rut == '' ){
            response.message = 'Rut empty' ;
            response.isValid = false ;
        } 

        rut = rut.replace('-', '') ;
        
        const response = await DeletePatient( rut ) ;

        res.send( { 
            response : true , 
            message : 'Patient remove!'
        } ) ;


    } 
    catch (error) {
        res.send( { error } ) ;
    }
};

const GetPatientByField = async ( req , res ) => {
    
    try {
 
        let response = { } ;
      
        let value = req.param('value') ;
        let field = req.param('field') ;


        if ( value == undefined || value == '' ){
            response.message = 'Rut empty' ;
            response.isValid = false ;
        }

        if ( field == undefined || field == '' ){
            response.message = 'Rut empty' ;
            response.isValid = false ;
        }

        
        const responseData = await GetPatientByField( value , field ) ;

        res.send( { 
            response : true , 
            message : 'Patient remove!',
            data : responseData
        } ) ;


    } 
    catch (error) {
        res.send( { error } ) ;
    }
};