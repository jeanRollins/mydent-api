const { Router } = require('express');

const router = Router();

const { validateRutExist, validateEmailExist }  = require('../controllers/UsersController') ;
const { GetSpecialtyData }  = require('../controllers/SpecialtyController') ;

const { home , authorize , validToken  }  = require('../controllers/LoginController') ;

const { index } = require('../controllers/AppController') ;

router.use( index ) ;

//LoginController
router.get( '/' ,  home ) ;
router.post( '/login/authorize' ,  authorize ) ;
router.post( '/login/validToken' ,  validToken ) ;


//UsersController
router.post( '/user/ValidateRutExist' ,  validateRutExist ) ;
router.post( '/user/ValidateEmailExist' ,  validateEmailExist ) ;



//SpecialtyController
router.get( '/specialty/GetSpecialty' ,  GetSpecialtyData ) ;




module.exports = router ;