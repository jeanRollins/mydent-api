const axios = require('axios');
const {RuteAppMydent} = require('../libs/Commons') ;

const url = 'https://service-mail.herokuapp.com/sendMail' ;

const from = "correo.mydent@gmail.com <foo@example.com>" ;


const bodyMailWelcome = ( name , link )  => /*html*/`
    <img src="${ RuteAppMydent +  '/assets/62e5d8b0b4a22528a161d71b2dcaab6e%20-%20copia%20(copia).png'}"/>
    <h2 style="text-align:center"> Bienvenido ${ name } </h2>
    <br>
    <p> Para termina su registro de correo, debe ingresar al siguiente link : </p>
    <a href="${link}" > ${link} </a>
`;

const bodyRecoveryPass = ( name , link )  => /*html*/`
    <img src="${ RuteAppMydent +  '/assets/62e5d8b0b4a22528a161d71b2dcaab6e%20-%20copia%20(copia).png'}"/>
    <h2 style="text-align:center"> Recuperar contraseña </h2>
    <br>
    <p>  Estimado ${ name }, para recuperar la contraseña ingrese al  <a href="${link}" > aquí </a> </p>
`;

const sendMailRecoveryPass = async ( name, link, emailToSend  )  => {
    
    const bodyMessage =  await  bodyRecoveryPass( name, link ) ;
    const message     =  await  getBodyMessageEmail( emailToSend , 'Recuperación de contraseña' , bodyMessage ) ; 
    const status      =  await  sendMail( url , message ) ; 
    return ( status == 200 )  ;
}
const sendMailWelcome = async data  => {
    const bodyMessage =  await  bodyMailWelcome( data.name , data.link ) ;
    const message     =  await  getBodyMessageEmail( data.email , 'Bienvenido a Mydent' , bodyMessage ) ; 
    const status      =  await  sendMail( url , message ) ; 
    return ( status == 200 )  ;
}

const send = async ( email , subject,  body ) => {
    const message     =  getBodyMessageEmail( email, subject, body ) ; 
    const status      =  await  sendMail( url , message ) ; 
    return ( status === 200 )  ;
}


const sendMail = async  ( url , message ) => {
    const response = await axios.post( url , message ) ;
    return response.status ; 
} 

const getBodyMessageEmail = ( to , subject , html ) => {

    return {
        from  ,
        to ,
        subject ,
        html
    }
}

module.exports = { sendMailWelcome, send, sendMailRecoveryPass } ;