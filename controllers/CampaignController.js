const { Add, GetCampaignsByUser } = require("../models/Campaign");

const AddCampaign = async ( req , res ) => {
    
    let response = { message : 'Campaign add ok' , action : true } ;

    const { rutUser, body, name, description, type } = req.body  ;

    if ( !rutUser || rutUser == undefined )  {
        response.message = 'rutUser required.' ;
        response.action = false ;
        res.send( response ) ;
        return  ;
    }   

    if ( !body || body == undefined )  {
        response.message = 'body required.' ;
        response.action = false ;
        res.send( response ) ;
        return  ;
    }   

    if ( !name || name == undefined )  {
        response.message = 'name required.' ;
        response.action = false ;
        res.send( response ) ;
        return  ;
    }   

    if ( !description || description == undefined )  {
        response.message = 'description required.' ;
        response.action = false ;
        res.send( response ) ;
        return  ;
    }   

    if ( !type || type == undefined )  {
        response.message = 'type required.' ;
        response.action = false ;
        res.send( response ) ;
        return  ;
    }   

    try {
        const responseAdd = await Add( rutUser, body, name, description, type ) ;
        
        if( !responseAdd ){
            response.message = 'Problem to insert.' ;
            response.action  = false ;
            res.send( response ) ;
            return  ;
        }
 
        res.send( response )
    } 
    catch (error) {
        res.send( { action : false , message : error } ) ;
    }
};

const GetCampaigns = async ( req , res ) => {
    
    let response = { message : 'ok' , action : true } ;

    const { rutUser } = req.body  ;

    if ( !rutUser || rutUser == undefined )  {
        response.message = 'rutUser required.' ;
        response.action = false ;
        res.send( response ) ;
        return  ;
    }   

    try {

        const campaignsFounded = await GetCampaignsByUser( rutUser ) ;
        response.data = campaignsFounded ;
        res.send( response )
    } 
    catch (error) {
        res.send( { action : false , message : error , data : [] } ) ;
    }
};

module.exports = {
    AddCampaign ,
    GetCampaigns
} ;