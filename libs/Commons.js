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


module.exports = {
    generateToken
}