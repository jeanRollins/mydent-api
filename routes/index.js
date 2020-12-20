const { Router } = require('express');
const router = Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const { validateRutExist, validateEmailExist, createUser, VerifyMail }  = require('../controllers/UsersController') ;
const { GetSpecialtyData }  = require('../controllers/SpecialtyController') ;

const { home , authorize , validToken  }  = require('../controllers/LoginController') ;
const { AddItemBudget , DeleteItemBudget  ,GetItemsBudget }  = require('../controllers/BudgetController') ;

const { addDocument, getDocuments, DestroyDocument }  = require('../controllers/ManagerDocumentController') ;

const { GetPatient , GetPatientByUserData , AddPatientFile , GetForecastsData , ValidatePatientExistByUserData }  = require('../controllers/PatientController') ;




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


//ManagerDocumentController
router.post( '/api/managerDocument/AddDocument' , upload.single( 'imgFile' ) ,  addDocument ) ;


//PatientController
router.post( '/api/patient/GetPatient' ,  GetPatient ) ;
router.post( '/api/patient/GetPatientByUserData' ,  GetPatientByUserData ) ;
router.post( '/api/patient/AddPatient' ,  AddPatientFile ) ;
router.get( '/api/patient/GetForecastsData' ,  GetForecastsData ) ;
router.post( '/api/patient/ValidatePatientExistByUserData' ,  ValidatePatientExistByUserData ) ;

//ManagerDocumentController
router.post( '/api/managerDocument/AddDocument'  ,  addDocument ) ;
router.post( '/api/managerDocument/GetDocuments' ,  getDocuments ) ;
router.post( '/api/managerDocument/DestroyDocument' ,  DestroyDocument ) ;

module.exports = router ;