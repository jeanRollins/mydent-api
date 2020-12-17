const { Router } = require('express');

const router = Router();

const { validateRutExist, validateEmailExist, createUser, VerifyMail }  = require('../controllers/UsersController') ;
const { GetSpecialtyData }  = require('../controllers/SpecialtyController') ;

const { home , authorize , validToken  }  = require('../controllers/LoginController') ;
const { AddItemBudget , DeleteItemBudget  ,GetItemsBudget }  = require('../controllers/BudgetController') ;


const { index } = require('../controllers/AppController') ;

router.use( index ) ;

//LoginController
router.get( '/' ,  home ) ;
router.post( '/login/authorize' ,  authorize ) ;
router.post( '/login/validToken' ,  validToken ) ;


//UsersController
router.post( '/user/ValidateRutExist'   ,  validateRutExist ) ;
router.post( '/user/CheckMail' ,  VerifyMail ) ;
router.post( '/user/ValidateEmailExist' ,  validateEmailExist ) ;
router.post( '/user/AddUser' ,  createUser ) ;

//SpecialtyController
router.get( '/specialty/GetSpecialty' ,  GetSpecialtyData ) ;


//BudgetController
router.post( '/api/budget/AddItemBudget' ,  AddItemBudget ) ;
router.post( '/api/budget/DeleteItemBudget' ,  DeleteItemBudget ) ;
router.post( '/api/budget/GetItemsBudget' ,  GetItemsBudget ) ;




module.exports = router ;