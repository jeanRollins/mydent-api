const { ValidateRut , ValidateEmail }   = require('../models/Users') ;


const validateRutExist = async ( req , res ) => {
    
    try {
        let response = { } ;
      
        let rut = req.param('rut') ;

        if ( rut == undefined || rut == '' ){
            response.message = 'Rut empty' ;
            response.isValid = false ;
        } 
        
        rut = rut.replace('-', '') ;
        response.isValid = await ValidateRut( rut ) ;

        response.message = ( response.isValid ) ? 'Rut not used' : 'Rut used' ; 
        
        console.log('response' , response);
        res.send( response ) ;

    } 
    catch (error) {
        res.send( { error } ) ;
    }
};

const validateEmailExist = async ( req , res ) => {
    
    try {
        let response = { } ;
      
        let email = req.param('email') ;

        if ( email == undefined || email == '' ){
            response.message = 'Email empty' ;
            response.isValid = false ;
        } 
        response.isValid = await ValidateEmail( email ) ;
        response.message = ( response.isValid ) ? 'Email not used' : 'Email used' ; 
        res.send( response ) ;

    }
    catch (error) {
        res.send( { error } ) ;
    }
};

module.exports = { validateRutExist , validateEmailExist} ;