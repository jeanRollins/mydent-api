//const RuteAppMydent = `http://localhost:3000` ;
const RuteAppMydent = `https://safe-river-95287.herokuapp.com` ;

const generateString =  stringlength  => {
	const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz" ;
    let   randomstring = '' ;
    
	for ( let i = 0; i < stringlength ; i++) {
		var rnum = Math.floor( Math.random() *  chars.length ) ;
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

const generateToken = () => 'TOKEN_' + generateString( 50 ) ;

const generateMailVerification = () => 'MAIL_' + generateString( 44 ) ;

const ValidateEmailFormat  =  email  =>  {
    const formatEmail = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ ;
    return ( !formatEmail.exec(email) ) ? false : true ;
}

const ValidateRutFormat  =  rutWithDigit  =>  {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutWithDigit ) ) return false ;
    let tmp 	= rutWithDigit.split('-');
    let digv	= tmp[ 1 ] ; 
    let rut 	= tmp[ 0 ] ;
    if ( digv == 'K' ) digv = 'k' ;
    return ( DigitVerificator( rut ) == digv );
}

const DigitVerificator =  digit => {
    let M = 0 ;
    let S = 1 ;
    for( ; digit ; digit = Math.floor( digit/10) ) S=(S+digit%10*(9-M++%6))%11;
    
    return S ? S - 1 : 'k' ;
}


module.exports = {
	generateToken ,
	generateMailVerification ,
	RuteAppMydent ,
	ValidateEmailFormat ,
	ValidateRutFormat
}