const { auth }    = require('../models/Users') ;
const { encrypt } = require('../libs/Encrypt') ;

const home = ( req , res ) => res.send( { message : 'Welcome to api for service mydent app.' , version : '1.0' } ) ;

const authorize = async ( req , res ) => {
    
    let response = { message : 'ok' } ;

    if ( !req.param('rut') )      response.message = 'Parametros no validos.' ;
    
    if ( !req.param('password') ) response.message = 'Parametros no validos.' ; 
    
    const  resp = await auth( req.param('rut') ,  req.param('password') ) ;
    
    response.auth = resp ; 
    
    res.send( response ) ;
};

module.exports = { home, authorize } ;