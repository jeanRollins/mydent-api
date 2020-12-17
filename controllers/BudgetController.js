const { AddItem, DeleteItem , GetItems} = require("../models/Budget");

const AddItemBudget = async ( req , res ) => {
    
    let response = { message : 'Item add ok' , action : true } ;

    const rut = req.param('rut')  ;
    const treatment = req.param('treatment')  ;
    const value = req.param('value')  ;

    if ( !rut || rut == undefined )  {
        response.message = 'Rut required.' ;
        response.action = false ;
    }   

    if ( !treatment || treatment == undefined ){
        response.message = 'Treatment required.' ;     
        response.action = false ;
    } 

    if ( !value || value == undefined ){
        response.message = 'Value required.' ;     
        response.action = false ;
    } 

    try {
        const responseAdd = await AddItem( rut , treatment , value  ) ;
        res.send( response ) ;
    } 
    catch (error) {
        res.send( {action : false , message : error } ) ;
    }
};

const DeleteItemBudget = async ( req , res ) => {
    
    let response = { message : 'ok' , action : true } ;

    const id = parseInt( req.param('id') )   ;

    if ( !id || id == undefined )  {
        response.message = 'Id required.' ;
        response.action = false ;
    }   

    try {
        const responseDelete = await DeleteItem( id ) ;
        res.send( response ) ;
    } 
    catch (error) {
        res.send( {action : false , message : error } ) ;
    }
};


const GetItemsBudget = async ( req , res ) => {
    
    let response = { message : 'ok' , action : true } ;

    const rut = parseInt( req.param('rut') )   ;

    if ( !rut || rut == undefined )  {
        response.message = 'Rut required.' ;
        response.action = false ;
    }   

    try {
        const items = await GetItems( rut ) ;
        res.send( items ) ;
    } 
    catch (error) {
        res.send( {action : false , message : error } ) ;
    }
};

module.exports = {
    AddItemBudget ,
    DeleteItemBudget ,
    GetItemsBudget
}