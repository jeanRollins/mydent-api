const { generateToken } = require('../libs/Commons');
const { QueryExec } = require('../libs/database') ;
const { encrypt , decrypt } = require('../libs/Encrypt') ;

/* 
const GetUsers = async () => {

    const sql = "SELECT * FROM usuarios" ;
    const response = await QueryExec( sql ) ;

    console.log('response*********************' , response );

    return  response ;
}
*/


const GetUsers = async () => {

    console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
    let result = await QueryExec(' SELECT * FROM usuarios ');
    return result ;
}

const GetUser = async ( rut ) => {
    const query = `SELECT * FROM usuarios WHERE rut = '${ rut }' ` ;
    console.log( 'query: ' , query ) ;
    const result = await QueryExec( query ) ;
    return ( result.length > 0 ) ? result[0] : [] ;
}

const AddUser = async ( user ) => {

    const pass = encrypt( user.pass ) ;

    const query = `INSERT INTO usuarios 
                    ( id , rut ,email , nombres, apellido_materno, apellido_paterno, token, password ) 
                     VALUES 
                    ( null , '${ user.rut }' , '${ user.email }', '${ user.nombres }',  '${ user.apellidoMaterno }' , '${ user.apellidoPaterno }' , '${ user.token }', '${ pass }' ) ` ;
   
    return [] ;
}

const auth = async ( rut , password )  =>  await validate( rut , password ) ;


const validate = async ( rut , password ) => {
    
    let userFounded = await GetUser( rut ) ;

    console.log('userFounded******************' , userFounded);

    console.log('userFounded.length' , userFounded.length);

    console.log('isArray' , Array.isArray( userFounded ) );

    

    if( ( Array.isArray( userFounded ) ) ) return false ;


    if(   typeof userFounded == 'object' ){

        console.log('userFounded.password ********' , userFounded.password );
        const passDecrypt = await decrypt( userFounded.password ) ;

        console.log('passDecrypt ********' , passDecrypt );

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

module.exports = {
    GetUsers ,
    AddUser ,
    UpdateField ,
    auth 
}
