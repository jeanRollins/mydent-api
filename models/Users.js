const { generateToken } = require('../libs/Commons');
const { QueryExec } = require('../libs/database') ;
const { encrypt , decrypt } = require('../libs/Encrypt') ;


const GetUsers = async () => {
    let result = await QueryExec(' SELECT * FROM usuarios ');
    return result ;
}

const GetUser = async ( rut ) => {
    const query = `SELECT * FROM usuarios WHERE rut = '${ rut }' ` ;
    const result = await QueryExec( query ) ;
    return ( result.length > 0 ) ? result[0] : [] ;
}

const GetUserByField = async ( field , value ) => {
    const query = `SELECT * FROM usuarios WHERE ${field} = '${ value }' ` ;
    const result = await QueryExec( query ) ;

    return ( result.length > 0 ) ? false : true ;
}

const AddUser = async ( user ) => {

    const pass = encrypt( user.pass ) ;

    const query = `INSERT INTO usuarios 
                    ( id , rut, nombres, apellido_materno, apellido_paterno, email, token, ultimo_acceso, email_verificacion, password, fecha_nacimiento,status ) 
                     VALUES 
                    ( null , '${ user.rut }' , '${ user.nombres }','${ user.apellidoMaterno }' , '${ user.apellidoPaterno }' , 
                    '${ user.email }', '${ user.token }', '${ user.ultimoAcceso }', '${ password }' , '${ fechaNacimiento }' , '${ status }' ) ` ;
   
    return [] ;
}

const auth = async ( rut , password )  =>  await validate( rut , password ) ;


const validate = async ( rut , password ) => {
    
    let userFounded = await GetUser( rut ) ;


    if( ( Array.isArray( userFounded ) ) ) return false ;


    if(   typeof userFounded == 'object' ){

        const passDecrypt = await decrypt( userFounded.password ) ;

        if( passDecrypt != password ) return false ;
    
        const token = generateToken() ;
    
        const responseUpdate = await UpdateField( 'usuarios', 'token' , token, 'string' ) ;
    
        userFounded.token = token ;
        return { isValidate : true , data : userFounded } ;
    } 
    else {
        return false 
    }

   
}

const UpdateField = async ( table, field , value , type = 'number' ) => {

    const fieldValue = ( type == 'string' ) ? `'${ value }'` : value ;   
    const query = `UPDATE ${ table } SET ${ field } = ${ fieldValue } ; `;
    const result = await QueryExec( query ) ;
    return result ;
}

const ValidateRut = async rut  => {

    const response = await GetUserByField( 'rut' , rut ) ;
    return response ;
}

const ValidateEmail = async email  => {

    const response = await GetUserByField( 'email' , email ) ;
    return response ;
}

module.exports = {
    GetUsers ,
    AddUser ,
    UpdateField ,
    auth ,
    GetUser ,
    ValidateRut ,
    ValidateEmail
}
