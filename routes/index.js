const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
//const upload = multer({ dest: 'uploads/' }) ;


const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads/'),
    filename: (req, file, cb) => {
        console.log('file***', file);

        cb(null, new Date().getTime() + path.extname( file.originalname ) ) ;
    }
}) 

const { validateRutExist, validateEmailExist, createUser, VerifyMail }  = require('../controllers/UsersController') ;
const { GetSpecialtyData }  = require('../controllers/SpecialtyController') ;

const { home , authorize , validToken , RecoveryPassword, ValidTokenMail, ChangePassword }  = require('../controllers/LoginController') ;
const { AddItemBudget , DeleteItemBudget  ,GetItemsBudget , GetItemsTratamientsByUser, CreateBudgetByUser , GetItemsBudgetFull, GetBudgetsFull ,UpdateStateItem}  = require('../controllers/BudgetController') ;

const { addDocument, getDocuments, DestroyDocument }  = require('../controllers/ManagerDocumentController') ;

const { GetPatient , GetPatientByUserData , AddPatientFile , GetForecastsData , ValidatePatientExistByUserData, UpdatePatientFile, SearchPatients ,updateStatePatient }  = require('../controllers/PatientController') ;

const { index } = require('../controllers/AppController') ;
const { GetPatientHistory, AddHistoryPatient } = require('../controllers/HistoryController');


const { AddTime ,GetTimes , ChangeStatusTime} = require('../controllers/TimeController');
const { AddCampaign , GetCampaigns, AddItemCampaigns , GetCampaign } = require('../controllers/CampaignController');

const { SendMail } = require('../controllers/CronController');

const { AddDicomFile , GetFilesDicomByPatient , DeleteDicom, GetFileDicom } = require('../controllers/DicomController');




router.use( index ) ;
router.use( multer({storage}).single('fileDicom') ) ;


//LoginController
router.get( '/' ,  home ) ;
router.post( '/login/authorize'       ,  authorize ) ;
router.post( '/login/validToken'      ,  validToken ) ;
router.post( '/login/recoverypass'    ,  RecoveryPassword ) ;
router.post( '/login/validTokenEmail' ,  ValidTokenMail ) ;
router.post( '/login/ChangePassword'  ,  ChangePassword ) ;

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
router.post( '/api/budget/GetItemsTratamientsByUser' ,  GetItemsTratamientsByUser ) ;
router.post( '/api/budget/CreateBudgetByUser', CreateBudgetByUser ) ;
router.post( '/api/budget/GetItemsBudgetFull', GetItemsBudgetFull ) ;
router.post( '/api/budget/GetBudgetsFull', GetBudgetsFull ) ;
router.post( '/api/budget/UpdateStateItem', UpdateStateItem ) ;

//ManagerDocumentController
router.post( '/api/managerDocument/AddDocument' ,  addDocument ) ;

//PatientController
router.post( '/api/patient/GetPatient' ,  GetPatient ) ;
router.post( '/api/patient/GetPatientByUserData' ,  GetPatientByUserData ) ;
router.post( '/api/patient/AddPatient' ,  AddPatientFile ) ;
router.get(  '/api/patient/GetForecastsData' ,  GetForecastsData ) ;
router.post( '/api/patient/ValidatePatientExistByUserData' ,  ValidatePatientExistByUserData ) ;
router.post( '/api/patient/UpdatePatientFile' ,  UpdatePatientFile ) ;
router.post( '/api/patient/SearchPatients' ,  SearchPatients ) ;
router.post( '/api/patient/UpdateStatePatient' ,  updateStatePatient ) ;

//ManagerDocumentController
router.post( '/api/managerDocument/AddDocument'  ,  addDocument ) ;
router.post( '/api/managerDocument/GetDocuments' ,  getDocuments ) ;
router.post( '/api/managerDocument/DestroyDocument' ,  DestroyDocument ) ;

//HistoryController
router.post( '/api/history/AddHistoryPatient'  ,  AddHistoryPatient ) ;
router.post( '/api/history/GetPatientHistory' ,   GetPatientHistory ) ;

//TimeController
router.post( '/api/time/AddTime', AddTime ) ;
router.post( '/api/time/GetTimes', GetTimes ) ;
router.post( '/api/time/ChangeStatusTime', ChangeStatusTime ) ;

//CampaignController
router.post( '/api/campaign/AddCampaign', AddCampaign ) ;
router.post( '/api/campaign/GetCampaigns', GetCampaigns ) ;
router.post( '/api/campaign/AddItemCampaigns', AddItemCampaigns ) ;
router.post( '/api/campaign/GetCampaign', GetCampaign ) ;

//CronController
router.get( '/api/cron/SendMail', SendMail ) ;

//DicomController
router.post( '/api/dicom/AddFile' , AddDicomFile ) ;
router.post( '/api/dicom/GetFilesDicomByPatient' , GetFilesDicomByPatient ) ;
router.post( '/api/dicom/DeleteDicom' , DeleteDicom ) ;
router.post( '/api/dicom/GetFileDicom' , GetFileDicom ) ;

module.exports = router ;