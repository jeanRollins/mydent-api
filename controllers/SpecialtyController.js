const { GetSpecialtyTreatment , GetSpecialty } = require("../models/Specialty");


const GetSpecialtyData = async ( req , res ) => {
    const specialty = req.query.specialty  ;
    try {
        //especialidad o tratamiento
        const dataFounded =  ( specialty == '' || specialty == undefined ) ? await GetSpecialty( ) : await GetSpecialtyTreatment( specialty )   ;
        res.send( dataFounded ) ;    
    } catch (error) {
        console.log( 'error : ' , error );
    }
    
};

module.exports = { GetSpecialtyData } ;
