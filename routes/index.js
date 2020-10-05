const { Router } = require('express');

const router = Router();

const { home , authorize }  = require('../controllers/LoginController') ;
const { index } = require('../controllers/AppController') ;

router.use( index ) ;

router.get( '/' ,  home ) ;

router.post( '/login/authorize' ,  authorize ) ;



module.exports = router ;