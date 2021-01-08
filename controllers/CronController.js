const { decrypt } = require("../libs/Encrypt");
const { send } = require("../libs/Mail");
const { UpdateStateItem, GetCampaignAndItems } = require("../models/Campaign");

const SendMail = async ( req , res ) => {
    
    let response = { message : 'ok' , action : true } ;

    try {

        const items     =  await GetCampaignAndItems() ;

        console.log( 'items' , items ) ;

        for ( let item of items ) {
            
            const body     = decrypt( item.body ) ;
            const email    = item.email ;
            const subject  = item.name_campaign ;
            const idItem   = item.id_item ;

            const responseSend = await send( email, subject, body ) ;
            if( !responseSend ){
                await UpdateStateItem( idItem , -1 ) ;
            }
            await UpdateStateItem( idItem , 2 ) ;
        }

        res.send( response ) ;
    } 
    catch (error) {
        res.send( { action : false , message : error } ) ;
    }
};

module.exports = {
    SendMail
} ;