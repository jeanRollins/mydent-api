const { ValidateRutFormat, ValidateEmailFormat } = require("../libs/Commons");
const { GetUserData } = require("../models/Users");
const { 
    GetPatientByUser, 
    AddPatient, 
    AddFile ,
    PatientValidRut , 
    PatientValidEmail ,
    AddPatientUser ,
    UpdateField ,
    GetPatientByField ,
    GetForecasts ,
    ValidatePatientExistByUser ,
    UpdatePatient ,
    UpdateFile ,
    SearchPatientsUsers
} = require("../models/Patient");


const SearchPatients = async ( req , res ) => {

    try {
 
        let response = { action : true , message : 'ok'} ;
        
        const { rutUser , value , field } = req.body ;
        
        if ( rutUser == undefined || rutUser == '' ){
            response.message = 'rutUser empty' ;
            response.action = false ;
        }
        
        if ( value == undefined || value == '' ){
            response.message = 'value empty' ;
            response.action = false ;
        }
        let fieldToSearch = 'rut_paciente' ;
        //field = ( field == undefined   ) ? 'rut_paciente' : field ;
        if( field === undefined  ||  field == '' ) {
            fieldToSearch = 'rut_paciente' ;
        }
        else {
            fieldToSearch = field ;
        }
        let patientsFounded = await SearchPatientsUsers( rutUser , value , fieldToSearch ) ;
        response.data = patientsFounded ;
        res.send( response ) ;

    } 
    catch (error) {
        res.send( { 
            action  : false , 
            message : error ,
            data    : []
        } ) ;
    }
}

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

const GetPatient = async ( req , res ) => {
    
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

        console.log( value , 'value' );
        console.log( field , 'field' );


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

        if( !responseAdd ) {
            response.action  = false ;
            response.message = 'Error add patient' ;
            res.send( response ) ;
            return false ;
        }
        const  responseAddFile = await AddFile ( patient['rut'] , patient['groupBlood'] , patient['medicaments'], patient['height'], patient['observations'] ) ;

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

const GetForecastsData = async ( req , res )  => {

    const forecasts = await  GetForecasts() ;
    res.send( forecasts ) ;
} 

const ValidatePatientExistByUserData = async ( req , res ) => {
    
    try {
 
        let response = {  action : true , message : 'ok' } ;
      
        let value = req.param('value') ;
        let field = req.param('field') ;


        if ( value == undefined || value == '' ){
            response.message = 'Value empty' ;
            response.action  = false ;
        }

        if ( field == undefined || field == '' ){
            response.message = 'Field empty' ;
            response.action  = false ;
        }

      


        let isValidEmail = true ;

        if( field == 'email' ){
            isValidEmail = await PatientValidEmail( value ) ;
        }else {

            const isValid = await ValidatePatientExistByUser( field , value ) ;

            if( !isValid ){
                response.action   =  false ; 
                response.message =  'Rut ocupped for other patient' ;
                res.send( response ) ;
                return false ;
            }
        }

        console.log('isValidEmail' , isValidEmail)
        if( !isValidEmail ){
            response.action   =  false ; 
            response.message =  'Email ocupped for other patient' ;
            res.send( response ) ;
            return false ;
        }

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


const ValidatorUpdatePatient = async patient => {

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


   console.log('patient[rut]' , patient['rut']);
    const rutFormat = ValidateRutFormat( patient['rut'] ) ;
    if( !rutFormat ){
        return { action : false , message : 'Rut is not format.' } ;
    }

    const emailFormat = ValidateEmailFormat( patient['email'] ) ;
    if( !emailFormat ){
        return { action : false , message : 'Email is not format.' } ;
    }
    
    return { action : true , message : 'ok' , data } ; 
} 
const UpdatePatientFile = async ( req , res ) => {

    try {
        let response = { action : true , message : 'ok'} ;
        const patient = req.body ;

        const isValid = await ValidatorUpdatePatient( patient ) ;
    
        if( !isValid.action ) {
            response.action  = false ;
            response.message = isValid.message ;
            res.send( response ) ;
            return false ;
        }
        
        const responseAdd = await UpdatePatient( 
                                    patient['name'], patient['lasnameMother'], 
                                    patient['lasnameFather'], patient['prevision'], 
                                    patient['rut'], patient['email'], 
                                    patient['born']
                                )  ;
        if( !responseAdd ) {
            response.action  = false ;
            response.message = 'Error add patient' ;
            res.send( response ) ;
            return false ;
        }
        const  responseAddFile = await UpdateFile( patient['rut'] , patient['groupBlood'] , patient['medicaments'], patient['height'], patient['observations'] ) ;

        if( !responseAddFile ) {
            response.action  = false ;
            response.message = 'Error add file patient' ;
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


const updateStatePatient = async (req, res) => {

    try {

        let response = { action: true, message: 'ok' };

        let rutUser = req.param('rutUser');
        let rutPatient = req.param('rutPatient')


        if (rutUser === undefined || !rutUser) {
            response.message = 'Rut usuario vacio';
            response.action = false;
            res.send(response);
            return false;

        }

        if (rutPatient === undefined || !rutPatient) {
            response.message = 'rut paciente vacio';
            response.action = false;
            res.send(response);
            return false;
        }
        
        const responseData = await updatePatientStateModel(rutPatient);
        res.send(responseData);

    } catch (error) {
        res.send({
            action: false,
            message: error,
            data: {}
        });
    }

}

module.exports = {
    GetPatient ,
    GetPatientByUserData ,
    AddPatientFile ,
    GetForecastsData ,
    ValidatePatientExistByUserData ,
    UpdatePatientFile ,
    SearchPatients
}