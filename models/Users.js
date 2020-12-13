const { generateToken ,generateMailVerification } = require('../libs/Commons');
const { QueryExec } = require('../libs/database') ;
const { encrypt , decrypt } = require('../libs/Encrypt') ;


const GetUsers = async () => {
    let result = await QueryExec(' SELECT * FROM usuarios ');
    return result ;
}

const GetUser = async ( value , field = 'rut' ) => {

    const query = `SELECT * FROM usuarios WHERE ${field} = '${ value }' ` ;
    const result = await QueryExec( query ) ;
    return ( result.length > 0 ) ? result[0] : [] ;
}

const GetUserByField = async ( field , value ) => {
    const query = `SELECT * FROM usuarios WHERE ${field} = '${ value }' ` ;
    const result = await QueryExec( query ) ;

    return ( result.length > 0 ) ? false : true ;
}

const AddUser = async ( user ) => {

    const password = encrypt( user.password ) ;
    const mailVerification = await generateMailVerification() ;

    const query = `INSERT INTO usuarios ( rut, nombres, apellido_materno, apellido_paterno, email, token, ultimo_acceso, email_verificacion, password, fecha_nacimiento,status ,created )  VALUES (  '${ user.rut }' , '${ user.name }', '' , '' , '${ user.email }', '', now(),'${ mailVerification }', '${ password }' , '0000-00-00 00:00:00' , 0 , now() ) ;  ` ;
    
    const result = await QueryExec( query ) ;

    const queryLastId = `SELECT LAST_INSERT_ID() as lastId ;`
    const resultLastId = await QueryExec( queryLastId ) ;
    
    return resultLastId[0].lastId ;
}

const auth = async ( rut , password )  =>  await validate( rut , password ) ;


const validate = async ( rut , password ) => {
    rut = rut.replace('-', '') ;
    console.log('rut' , rut);
    
    let userFounded = await GetUser( rut ) ;
    

    if( ( Array.isArray( userFounded ) ) ) return false ;


    if(   typeof userFounded == 'object' ){

        const passDecrypt = await decrypt( userFounded.password ) ;

        if( userFounded.status != 1 ) return false ;

        if( passDecrypt != password ) return false ;
    
        const token = generateToken() ;
    
        const responseUpdate = await UpdateField( 'token' , token, userFounded.id ,'string' ) ;
        const responseUpdateAccess = await UpdateField( 'ultimo_acceso' , 'now()', userFounded.id  ) ;

    
        userFounded.token = token ;
        return { isValidate : true , data : userFounded } ;
    } 
    else {
        return false 
    }

   
}

const UpdateField = async (  field , value , id , type = 'number' ) => {

    const fieldValue = ( type == 'string' ) ? `'${ value }'` : value ;   
    const query = `UPDATE usuarios SET ${ field } = ${ fieldValue }  WHERE id=${id} ; `;
    console.log('query' , query);
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
