const { Router } = require('express');

const router = Router();

const { home , authorize }  = require('../controllers/LoginController') ;
const { GetSpecialtyData }  = require('../controllers/SpecialtyController') ;

const { index } = require('../controllers/AppController') ;

router.use( index ) ;

//LoginController
router.get( '/' ,  home ) ;
router.post( '/login/authorize' ,  authorize ) ;


//SpecialtyController
router.get( '/specialty/GetSpecialty' ,  GetSpecialtyData ) ;




module.exports = router ;