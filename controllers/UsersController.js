const { RuteAppMydent, generateMailVerification } = require('../libs/Commons');
const { sendMailWelcome } = require('../libs/Mail');
const { ValidateRut , ValidateEmail, AddUser, GetUser , UpdateField }   = require('../models/Users') ;


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



const createUser = async ( req , res ) => {
    
    const email      = req.param('email') ;
    const rut        = req.param('rut').replace('-' , '') ;
    const name       = req.param('name') ;
    const password   = req.param('password') ;

    const user = {
        name  ,
        email ,
        rut   ,
        password   
    };

    try {
        let response = {} ;
        const validation = await validateData( email , rut , password ) ;


        if( !validation.validate ){
            res.send( validation ) ;
        } 
        else {
            const idUser = await AddUser( user ) ;

            if( idUser != 0 || idUser == undefined || idUser == false  ){

                const dataUser = await GetUser( idUser , 'id' ) ;
                const ruteMailVerify =  RuteAppMydent + `/mail_validate/${dataUser.email_verificacion}` ;

                const responseMail = await sendMailWelcome({
                    name : dataUser.nombres ,
                    email : dataUser.email ,
                    link  : ruteMailVerify
                }) ;

                res.send( { 
                    valid : true,
                    message :  dataUser.nombres  
                });

            }
            else{

                res.send( { 
                    valid : false,
                    message  : 'Problems to  insert'  
                });
            }
        }
    }
    catch (error) {

        res.send( { 
            valid : false,
            message  : 'Problems to  insert'  ,
            error : error
        })
        
    }
};

const validateData = async ( email , rut , password ) => {

    let response = {} ; 

    response.message  = 'Valid data' ;
    response.validate = true ;

    if ( email == undefined || email == '' ){
        response.message  = 'Email empty' ;
        response.validate = false ;
        return response ;
    }
    

    if ( rut == undefined || rut == '' ){
        response.message  = 'Rut empty' ;
        response.validate = false ;
        return response ;
    }

    if ( password.length < 7 ){
        response.message  = 'Long password greater than 6' ;
        response.validate = false ;
        return response ;
    }


    const validateEmail = await ValidateEmail( email ) ;

    if( !validateEmail ){
        response.message  = 'Email  used' ;
        response.validate = false ;
        return response ;
    }

    const validateRut = await ValidateRut( rut ) ;

    if( !validateRut ){
        response.message  = 'Rut  used' ;
        response.validate = false ;
        return response ;
    }

    return response ; 
}

const VerifyMail = async ( req , res )  => {

    let response = {} ; 

    const mailCheck = req.param('codMail') ;

    if ( mailCheck == undefined || mailCheck == '' ){
        res.send( { 
            action : false ,
            message :  'mailCheck empty'  ,
            user : null
        });
        return ;
    }

    try {

        const user = await GetUser( mailCheck , 'email_verificacion') ;
        
        if( (typeof user === 'object') && ( user.id !== undefined ) ) {

            const mailVerification = await generateMailVerification() ; 

            const responseUpdate = await  UpdateField( 'status' , 1 , user.id ) ;

            const responseUpdateVerification = await  UpdateField( 'email_verificacion' , mailVerification , user.id , 'string') ;


            res.send( { 
                action : true,
                message :  'Change status user ok!' ,
                user 
            });
            
        }
        else {
            res.send( { 
                action : false ,
                message :  'Email code not valid.'  ,
                user : null
            });
        }

        
    } catch (error) {
        res.send( { 
            action  : false ,
            message :  error   
        });    
    }
}




module.exports = { validateRutExist , validateEmailExist , createUser , VerifyMail } ;