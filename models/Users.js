const { generateToken } = require('../libs/Commons');
const { pool } = require('../libs/database') ;
const { encrypt , decrypt } = require('../libs/Encrypt') ;



const GetUsers = async () => {
    let result = await pool.query(' SELECT * FROM usuarios ');
    return result.rows ;
}

const GetUser = async ( rut ) => {
    const query = `SELECT * FROM usuarios WHERE rut = '${ rut }' ` ;
    console.log( 'query: ' , query ) ;
    const result = await pool.query( query ) ;
    return ( result.rows.length > 0 ) ? result.rows[0] : [] ;
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

    if( userFounded.length == 0 ) return false ;

    const passDecrypt = await decrypt( userFounded.password ) ;

    if( passDecrypt != password ) return false ;

    const token = generateToken() ;

    const responseUpdate = await UpdateField( 'usuarios', 'token' , token, 'string' ) ;

    userFounded.token = token ;
    return { isValidate : true , data : userFounded } ;
}

const UpdateField = async ( table, field , value , type = 'number' ) => {

    const fieldValue = ( type == 'string' ) ? `'${ value }'` : value ;   
    const query = `UPDATE ${ table } SET ${ field } = ${ fieldValue } ; `;
    console.log('query****' , query);
    const result = await pool.query( query ) ;
    return result ;
}

module.exports = {
    GetUsers ,
    AddUser ,
    UpdateField ,
    auth 
}