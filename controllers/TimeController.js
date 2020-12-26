const { AddDetail, Add, GetTimesFull } = require("../models/Time");

const ValidateTime = async ( codTime, rutPatient, rutUser, date, time ) => {

    let response = { action : true , message : 'ok'} ;

    if ( codTime == undefined || codTime == '' ){
        response.message = 'codTime empty' ;
        response.action = false ;
        return response ;
    }

    if ( rutPatient == undefined || rutPatient == '' ){
        response.message = 'rutPatient empty' ;
        response.action = false ;
        return response ;
    }
    
    if ( rutUser == undefined || rutUser == '' ){
        response.message = 'rutUser empty' ;
        response.action = false ;
        return response ;
    }

    if ( date == undefined || date == '' ){
        response.message = 'date empty' ;
        response.action = false ;
        return response ;
    }

    if ( time == undefined || time == '' ){
        response.message = 'time empty' ;
        response.action = false ;
        return response ;
    }

    return response ;
}

const AddTime = async ( req , res ) => {
    
    try {
        let response = { action : true , message : 'ok'} ;

        const { codTime, rutPatient, rutUser, date, time } = req.body ;
        const responseValidate = await ValidateTime( codTime, rutPatient, rutUser, date, time ) ;
        
        if( !responseValidate.action ){
            res.send( responseValidate ) ;
            return false ;
        }
        const idDetail = await AddDetail( codTime , '' )  ;

        if( !idDetail ) {
            response.message = 'idDetail no insert' ;
            response.action = false ;
            res.send( response ) ;
            return false ;
        }

        let idTime = await Add( codTime , rutPatient , rutUser, date, time  ) ;
        response.data =  {  idTime , codTime  } ;
        res.send( response ) ;
    } 
    catch (error) {
        res.send( { 
            action  : false , 
            message : error 
        } ) ;
    }
}

const ValidateTimes = ( rutUsuario, since, until ) => {
    let response = { action : true , message : 'ok'} ;

    if ( rutUsuario == undefined || rutUsuario == '' ){
        response.message = 'rutUsuario empty' ;
        response.action = false ;
        return response ;
    }

    if ( since == undefined || since == '' ){
        response.message = 'since empty' ;
        response.action = false ;
        return response ;
    }
    
    if ( until == undefined || until == '' ){
        response.message = 'until empty' ;
        response.action = false ;
        return response ;
    }

    return response ; 
}
const GetTimes = async ( req , res ) => {

    let response = { action : true , message : 'ok'} ;

    try {
        const { rutUser, since, until } = req.body ;
        const timesValidate = await ValidateTimes( rutUser, since, until ) ;
       
        if( !timesValidate.action ){
            res.send( timesValidate ) ;
            return false ;
        }

        const timesFounded = await GetTimesFull( rutUser, since, until ) ;
        response.data = timesFounded 
        res.send( response ) ;
    } 
    catch (error) {
        res.send( { 
            action  : false , 
            message : error ,
            data : []
        } ) ;
    }   
}
module.exports = {
    AddTime , GetTimes
}