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
    console.log( query ) ;
    //let result = await pool.query( query );
    //return result.rows ;
    return [] ;
}

const auth = async ( rut , password )  =>  await validate( rut , password ) ;


const validate = async ( rut , password ) => {
    
    const userFounded = await GetUser( rut ) ;

    if( userFounded.length == 0 ) return false ;

    const passDecrypt = await decrypt( userFounded.password ) ;

    if( passDecrypt != password ) return false ;

    return true ;
}
module.exports = {
    GetUsers ,
    AddUser ,
    auth 
}