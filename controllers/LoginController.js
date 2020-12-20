const { auth  , GetUsers, GetUser }   = require('../models/Users') ;
const { encrypt , decrypt  } = require('../libs/Encrypt') ;
var cloudinary = require('cloudinary');

const home = async ( req , res ) => {

    cloudinary.config({ 
        cloud_name: 'sample', 
        api_key: '436895833878252', 
        api_secret: 'jLD8W5tx642j_fDu1kzOlBFrce4' 
    });

    cloudinary.api.delete_resources(['sample'], function(error, result) {console.log(result, error); });
    
    res.send( {hola : 'api'} ) ;
}

const authorize = async ( req , res ) => {
    
    let response = { message : 'ok' } ;
    if ( !req.param('rut') )      response.message = 'Parametros no validos.' ;
    if ( !req.param('password') ) response.message = 'Parametros no validos.' ;     
    const  resp = await auth( req.param('rut') ,  req.param('password') ) ;
    
    response.auth = resp ; 
    
    res.send( response ) ;
};

const isValidToken = async ( token , rut ) => {

    const user = await GetUser( rut ) ;

    if( user == [] ){

        return false ;
    } 
    else {
        
        const response =  user.token == token ? true : false ;
        
        return response ;
    } 
}    


const validToken = async ( req , res )  => {

    let response = {  } ;

    try {
        if ( !req.param('token') )      response.message = 'Parametros no validos.' ;
        if ( !req.param('rut')   )      response.message = 'Parametros no validos.' ;   

        const token = req.param('token') ;
        const rut   = req.param('rut')   ;

        const isValid = await isValidToken( token , rut )   ;    

        if( isValid ){
            response.token   = token ;
            response.valid   = isValid ;
            response.message = `Token Valid :) ` ;
            res.send( response ) ;

        }
        else {
            response.token   = false ;
            response.valid   = isValid ;
            response.message = `Token not valid :(` ;
            res.send( response ) ;
        }


    } catch (error) {
        res.send( { error } ) ;
    }
    
}



module.exports = { home, authorize , validToken } ;

