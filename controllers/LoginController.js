const { auth  , GetUsers, GetUser, UpdateField }   = require('../models/Users') ;
const { encrypt , decrypt  } = require('../libs/Encrypt') ;
var cloudinary = require('cloudinary');
const { ValidateRutFormat, generateMailVerification, RuteAppMydent } = require('../libs/Commons');
const { sendMailRecoveryPass } = require('../libs/Mail');

const home = async ( req , res ) => {

    res.send( { messagge : 'Welcome to api mydent version 1.0' , status : 200 } ) ;
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

const RecoveryPassword = async ( req , res ) => {
    
    try {
        const { rut } = req.body ;

        if ( rut == undefined || rut == '' ){
            res.send( {  response : false , message : 'Rut empty' } ) ;
            return false ;
        }
        
        const isValid = await ValidateRutFormat( rut ) ;
        
        if( !isValid ){
            res.send({ response: false, message : 'Rut no valid'}) ;
            return false ;
        }

        const user = await GetUser( rut.replace( '-', '' ) ) ;

        if( user.length == 0 ){
            res.send({ response: false, message : 'User no valid'}) ;
            return false ;
        }

        const mailVerification = await generateMailVerification() ;

        const ruteMailVerify =  RuteAppMydent + `/changepassword/${ mailVerification }` ;

        const sendResponse = await sendMailRecoveryPass( user.nombres ,ruteMailVerify, user.email ) ;

        if( !sendResponse ){
            res.send({ response: false, message : 'Problem to send mail'}) ;
        }
        else {
            await UpdateField( 'email_verificacion', mailVerification, user.id , 'string' ) ;
            res.send({ response: true, message : 'ok'}) ;
        }
    }
    catch (error) {
        res.send( { response: false, message : error } ) ;
    }
};

const ValidTokenMail = async (  req , res ) => {
    try {
        const { token } = req.body ;

        if ( token == undefined || token == '' ){
            res.send( {  response : false , message : 'Token empty' } ) ;
            return false ;
        }

        const user = await GetUser( token , 'email_verificacion' ) ;

        if( user.length == 0 ){
            res.send({ response: false, message : 'Token no valid'}) ;
            return false ;
        }

        res.send({ response: true, message : 'Token valid'}) ;

    }
    catch (error) {
        res.send( { response: false, message : error } ) ;
    }
}

const ChangePassword = async (  req , res ) => {
    try {
        const { token, password1, password2 } = req.body ;

        if ( token == undefined || token == '' ){
            res.send( {  response : false , message : 'Token empty' } ) ;
            return false ;
        }

        if ( password1 == undefined || password1 == '' ){
            res.send( {  response : false , message : 'Password1 empty' } ) ;
            return false ;
        }

        if ( password2 == undefined || password2 == '' ){
            res.send( {  response : false , message : 'Password2 empty' } ) ;
            return false ;
        }

        if ( password2 !== password2  ){
            res.send( {  response : false , message : 'Passwords must match' } ) ;
            return false ;
        }

        const user = await GetUser( token , 'email_verificacion' ) ;

        if( user.length == 0 ){
            res.send({ response: false, message : 'Token no valid'}) ;
            return false ;
        }

        const passEncrypt = await  encrypt( password1 ) ;

        console.log('passEncrypt' , passEncrypt ) ;
        await UpdateField( 'password', passEncrypt, user.id , 'string' ) ;

        const mailVerification = await generateMailVerification() ;

        await UpdateField( 'email_verificacion', mailVerification, user.id , 'string' ) ;

        res.send({ response: true, message : 'ok'}) ;
    }
    catch (error) {
        res.send( { response: false, message : error } ) ;
    }
}

module.exports = { home, authorize , validToken, RecoveryPassword, ValidTokenMail, ChangePassword } ;

