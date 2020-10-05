const { auth }    = require('../models/Users') ;
const { encrypt } = require('../libs/Encrypt') ;

const home = async ( req , res ) => {
    
    //console.log('req' , req);
    //const  resp = await auth('181913878' , '123456') ;
    //console.log( 'resp' , resp ) ;

    res.send( {  saludo : 'hola!'} );
};

const authorize = async ( req , res ) => {
    
    let response = { message : 'ok' } ;

    if ( !req.param('rut') )      response.message = 'Parametros no validos.' ;
    
    if ( !req.param('password') ) response.message = 'Parametros no validos.' ; 
    
    const  resp = await auth( req.param('rut') ,  req.param('password') ) ;
    
    response.auth = resp ; 
    
    res.send( response ) ;
};

module.exports = { home, authorize } ;