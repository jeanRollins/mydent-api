const { Router } = require('express');

const router = Router();

const { home , authorize , validToken  }  = require('../controllers/LoginController') ;
const { GetSpecialtyData }  = require('../controllers/SpecialtyController') ;

const { index } = require('../controllers/AppController') ;

router.use( index ) ;

//LoginController
router.get( '/' ,  home ) ;
router.post( '/login/authorize' ,  authorize ) ;
router.post( '/login/validToken' ,  validToken ) ;



//SpecialtyController
router.get( '/specialty/GetSpecialty' ,  GetSpecialtyData ) ;




module.exports = router ;