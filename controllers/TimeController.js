const { AddDetail, Add } = require("../models/Time");

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
        console.log( 'idDetail' , idDetail ) ;
        if( !idDetail ) {
            response.message = 'idDetail no insert' ;
            response.action = false ;
            res.send( response ) ;
            return false ;
        }

        let idTime = await Add( codTime , rutPatient , rutUser, date, time  ) ;
        console.log( 'idTime' , idTime ) ;

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
    AddTime
}