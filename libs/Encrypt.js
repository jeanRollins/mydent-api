const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

const encrypt = data => cryptr.encrypt( data ) ;

const decrypt = async data  => await cryptr.decrypt( data ) ;

module.exports = { decrypt , encrypt } ;
