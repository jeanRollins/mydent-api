const { auth  , GetUsers}   = require('../models/Users') ;
const { encrypt , decrypt  } = require('../libs/Encrypt') ;

const home = async ( req , res ) => {

    const users  = await GetUsers( ) ;

    const pass   = await encrypt( '123456' ) ;

    const dec = await decrypt( pass ) ;

    res.send( users ) ;
}

const authorize = async ( req , res ) => {
    
    let response = { message : 'ok' } ;
    if ( !req.param('rut') )      response.message = 'Parametros no validos.' ;
    if ( !req.param('password') ) response.message = 'Parametros no validos.' ; 
    
    const  resp = await auth( req.param('rut') ,  req.param('password') ) ;
    
    response.auth = resp ; 
    
    res.send( response ) ;
};

module.exports = { home, authorize } ;