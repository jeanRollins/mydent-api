const { AddItem, DeleteItem , GetItems , GetTratamientByUser  ,CreateBudget , AddItemsBudget, UpdateStateBudget , GetItemsByPatient, GetBudgetByPatient } = require("../models/Budget");

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


const GetItemsTratamientsByUser = async ( req , res ) => {
    
    let response = { message : 'ok' , action : true } ;

    const rutUser = req.param('rutUser')  ;
   
    try {

        if ( !rutUser || rutUser == undefined )  {
            response.message = 'rutUser required.' ;
            response.data = [] ;
            response.action = false ;
            res.send( response ) ;
            return  false ;
        }

        const items = await GetTratamientByUser( rutUser ) ;
        response.data = items ;
        res.send( response ) ;
    } 
    catch (error) {
        res.send( { action : false , message : error, data : [] } ) ;
    }
};

const CreateBudgetByUser =  async ( req , res ) => {
    
    let response = { message : 'Item add ok' , action : true } ;

    const { rutPatient , rutUser, items } = req.body ;  

    if ( !rutPatient || rutPatient == undefined )  {
        response.message = 'rutPatient required.' ;
        response.action = false ;
    };   

    if ( !rutUser || rutUser == undefined )  {
        response.message = 'rutUser required.' ;
        response.action = false ;
    };   

    if ( !Array.isArray( items ) || items == undefined )  {
        response.message = 'Items is type array required.' ;
        response.action = false ;
    };

    try {
        const responseAdd = await CreateBudget( rutUser, rutPatient ) ; 
        console.log( 'responseAdd' , responseAdd) ;

        if( !responseAdd ){
            response.message = 'Problem to insert' ;
            response.action = false ;
            res.send( response ) ;
            return ;
        }

        const responseAddItems = await AddItemsBudget( responseAdd , items ) ; 
        
        if( !responseAddItems ){
            response.message = 'Problem to insert items' ;
            response.action = false ;
            res.send( response ) ;
            return ;
        }

        const resp = await UpdateStateBudget( responseAdd , 1 ) ;
        res.send( response ) ;

    } catch ( error ) {
        res.send( { action : false , message : error } ) ;
    }
  
};

const GetItemsBudgetFull = async ( req , res ) => {

    let response = { message : 'ok' , action : true } ;

    const { id , rutUser } = req.body ;  

    if ( !rutUser || rutUser == undefined )  {
        response.message = 'rutUser required.' ;
        response.action = false ;
        res.send( response ) ;
        return  false ;
    }

    if ( !id || id == undefined )  {
        response.message = 'id required.' ;
        response.action = false ;
        res.send( response ) ;
        return  false ;
    }


    const itemFounded = await GetItemsByPatient( id, rutUser ) ;
    response.data = itemFounded ; 
    res.send( response ) ;
} ;

const GetBudgetsFull = async ( req , res ) => {

    let response = { message : 'ok' , action : true } ;
    const { rutPatient , rutUser } = req.body ;  

    if ( !rutUser || rutUser == undefined )  {
        response.message = 'rutUser required.' ;
        response.action = false ;
        res.send( response ) ;
        return  false ;
    }

    if ( !rutPatient || rutPatient == undefined )  {
        response.message = 'rutPatient required.' ;
        response.action = false ;
        res.send( response ) ;
        return  false ;
    }


    const itemFounded = await GetBudgetByPatient( rutUser , rutPatient ) ;
    response.data = itemFounded ; 
    res.send( response ) ;
} ;



module.exports = {
    AddItemBudget ,
    DeleteItemBudget ,
    GetItemsBudget ,
    GetItemsTratamientsByUser ,
    CreateBudgetByUser ,
    GetItemsBudgetFull ,
    GetBudgetsFull
}