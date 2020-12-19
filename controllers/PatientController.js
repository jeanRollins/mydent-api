const { ValidateRutFormat, ValidateEmailFormat } = require("../libs/Commons");
const { GetUserData } = require("../models/Users");
const { 
    GetPatientByUser, 
    AddPatient, 
    AddFile ,
    PatientValidRut , 
    PatientValidEmail ,
    AddPatientUser ,
    UpdateField
} = require("../models/Patient");


const RemovePatient = async ( req , res ) => {
    
    try {
 
        let response = { } ;
      
        let rut = req.param('rut') ;

        if ( rut == undefined || rut == '' ){
            response.message = 'Rut empty' ;
            response.isValid = false ;
        } 

        rut = rut.replace('-', '') ;
        
        const data = await DeletePatient( rut ) ;

        res.send( { 
            response : true , 
            message : 'Patient remove!'
        } ) ;


    } 
    catch (error) {
        res.send( { error } ) ;
    }
};

const GetPatientByUserData = async ( req , res ) => {

    try {
 
        let response = { action : true , message : 'ok'} ;
      
        const rut = req.param('rut') ;

        if ( rut == undefined || rut == '' ){
            response.message = 'Rut empty' ;
            response.action = false ;
        }

        const user = await GetUserData( rut ) ;

        if( user.id == undefined  ){
            response.action  = false ;
            response.message = 'Patient not found' ;
            response.data    =  { user : {} , patients : [] } ;
            res.send( response ) ;
            return false ;
        }

        let patients = await GetPatientByUser( rut ) ;
        response = { ...response , data : { user , patients } } ;
    
        res.send( response ) ;

    } 
    catch (error) {
        res.send( { 
            action  : false , 
            message : error ,
            data    : { user : {} , patients : [] }
        } ) ;
    }
}

const GetPatient = async ( ) => {
    
    try {
 
        let response = { } ;
      
        let value = req.param('value') ;
        let field = req.param('field') ;


        if ( value == undefined || value == '' ){
            response.message = 'Rut empty' ;
            response.action = false ;
        }

        if ( field == undefined || field == '' ){
            field = 'rut' ;
        }

        const patient = await GetPatientByField( value , field ) ;

        response.action  =  ( patient.id !== undefined ) ; 
        response.message =  ( patient.id == undefined ) ? 'Patient not found' : 'ok' ;
        response.data    =  patient ;

        res.send( response ) ;

    } 
    catch (error) {
        res.send( { 
            action  : false , 
            message : error ,
            data    : {} 
        } ) ;
    }
};

const ValidatorAddPatient = async patient => {

    const params = [ 'rut' , 'name', 'lasnameMother' , 'lasnameFather' , 'prevision',  'email', 'born'] ;
    let data = {} ; 
    let valid    = true ; 
    let response = null ; 
     
    for( let i of params ){
        
        let value    = patient[i] ;
        response = null ; 
        valid    = true ; 

        if ( value == undefined || value == '' ){    
            response  = { action : false , message : i + ' empty' } ;
            valid = false ; 
            break ;
        }
    }
    
    if( !valid ){
        return response ;
    }  

    const patientIsValidRut = await PatientValidRut( patient['rut'] ) ;
    

    const rutFormat = ValidateRutFormat( patient['rut'] ) ;
    if( !rutFormat ){
        return { action : false , message : 'Rut is not format.' } ;
    }

    const emailFormat = ValidateEmailFormat( patient['email'] ) ;
    if( !emailFormat ){
        return { action : false , message : 'Email is not format.' } ;
    }

    if( !patientIsValidRut ){
        return { action : false , message : 'Rut is registered' } ;
    }

    const patientIsValidEmail = await PatientValidEmail( patient['email'] ) ;

    if( !patientIsValidEmail ){
        return { action : false , message : 'Email is registered' } ;
    }
    
    return { action : true , message : 'ok' , data } ; 
} 

const AddPatientFile = async ( req , res ) => {

    try {
        let response = { action : true , message : 'ok'} ;
        const patient = req.body ;

        const isValid = await ValidatorAddPatient( patient ) ;
    
        if( !isValid.action ) {
            response.action  = false ;
            response.message = isValid.message ;
            res.send( response ) ;
            return false ;
        }
        
        const responseAdd = await AddPatient( 
                                    patient['name'], patient['lasnameMother'], 
                                    patient['lasnameFather'], patient['prevision'], 
                                    patient['rut'], patient['email'], 
                                    patient['born']
                                )  ;

        console.log('responseAdd' , responseAdd);

        if( !responseAdd ) {
            response.action  = false ;
            response.message = 'Error add patient' ;
            res.send( response ) ;
            return false ;
        }
        const  responseAddFile = await AddFile ( patient['rut'] , patient['groupBlood'] , patient['medicaments'], patient['height'], patient['observations'] )
        console.log('responseAddFile' , responseAddFile );
        if( !responseAddFile ) {
            response.action  = false ;
            response.message = 'Error add file patient' ;
            res.send( response ) ;
            return false ;
        }
        const  responseAddPatientUser = await AddPatientUser( patient['rutUser'] , patient['rut']  )

        if( !responseAddPatientUser ) {
            response.action  = false ;
            response.message = 'Error add file patient user' ;
            res.send( response ) ;
            return false ;
        }

        const update = await UpdateField( patient['rut'] ) ;
        res.send( response ) ;
    } 
    catch (error) {
        res.send( { 
            action  : false , 
            message : error 
        } ) ;
    }
}

module.exports = {
    GetPatient ,
    GetPatientByUserData ,
    AddPatientFile 
}