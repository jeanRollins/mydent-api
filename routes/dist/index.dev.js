"use strict";

var _require = require('express'),
    Router = _require.Router;

var router = Router();

var multer = require('multer');

var path = require('path'); //const upload = multer({ dest: 'uploads/' }) ;


var storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads/'),
  filename: function filename(req, file, cb) {
    console.log('file***', file);
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
});

var _require2 = require('../controllers/UsersController'),
    validateRutExist = _require2.validateRutExist,
    validateEmailExist = _require2.validateEmailExist,
    createUser = _require2.createUser,
    VerifyMail = _require2.VerifyMail;

var _require3 = require('../controllers/SpecialtyController'),
    GetSpecialtyData = _require3.GetSpecialtyData;

var _require4 = require('../controllers/LoginController'),
    home = _require4.home,
    authorize = _require4.authorize,
    validToken = _require4.validToken;

var _require5 = require('../controllers/BudgetController'),
    AddItemBudget = _require5.AddItemBudget,
    DeleteItemBudget = _require5.DeleteItemBudget,
    GetItemsBudget = _require5.GetItemsBudget,
    GetItemsTratamientsByUser = _require5.GetItemsTratamientsByUser,
    CreateBudgetByUser = _require5.CreateBudgetByUser,
    GetItemsBudgetFull = _require5.GetItemsBudgetFull,
    GetBudgetsFull = _require5.GetBudgetsFull,
    UpdateStateItem = _require5.UpdateStateItem;

var _require6 = require('../controllers/ManagerDocumentController'),
    addDocument = _require6.addDocument,
    getDocuments = _require6.getDocuments,
    DestroyDocument = _require6.DestroyDocument;

var _require7 = require('../controllers/PatientController'),
    GetPatient = _require7.GetPatient,
    GetPatientByUserData = _require7.GetPatientByUserData,
    AddPatientFile = _require7.AddPatientFile,
    GetForecastsData = _require7.GetForecastsData,
    ValidatePatientExistByUserData = _require7.ValidatePatientExistByUserData,
    UpdatePatientFile = _require7.UpdatePatientFile,
    SearchPatients = _require7.SearchPatients,
    updateStatePatient = _require7.updateStatePatient;

var _require8 = require('../controllers/AppController'),
    index = _require8.index;

var _require9 = require('../controllers/HistoryController'),
    GetPatientHistory = _require9.GetPatientHistory,
    AddHistoryPatient = _require9.AddHistoryPatient;

var _require10 = require('../controllers/TimeController'),
    AddTime = _require10.AddTime,
    GetTimes = _require10.GetTimes,
    ChangeStatusTime = _require10.ChangeStatusTime;

var _require11 = require('../controllers/CampaignController'),
    AddCampaign = _require11.AddCampaign,
    GetCampaigns = _require11.GetCampaigns,
    AddItemCampaigns = _require11.AddItemCampaigns,
    GetCampaign = _require11.GetCampaign;

var _require12 = require('../controllers/CronController'),
    SendMail = _require12.SendMail;

var _require13 = require('../controllers/DicomController'),
    AddDicomFile = _require13.AddDicomFile,
    GetFilesDicomByPatient = _require13.GetFilesDicomByPatient,
    DeleteDicom = _require13.DeleteDicom,
    GetFileDicom = _require13.GetFileDicom;

router.use(index);
router.use(multer({
  storage: storage
}).single('fileDicom')); //LoginController

router.get('/', home);
router.post('/login/authorize', authorize);
router.post('/login/validToken', validToken); //UsersController

router.post('/user/ValidateRutExist', validateRutExist);
router.post('/user/CheckMail', VerifyMail);
router.post('/user/ValidateEmailExist', validateEmailExist);
router.post('/user/AddUser', createUser); //SpecialtyController

router.get('/specialty/GetSpecialty', GetSpecialtyData); //BudgetController

router.post('/api/budget/AddItemBudget', AddItemBudget);
router.post('/api/budget/DeleteItemBudget', DeleteItemBudget);
router.post('/api/budget/GetItemsBudget', GetItemsBudget);
router.post('/api/budget/GetItemsTratamientsByUser', GetItemsTratamientsByUser);
router.post('/api/budget/CreateBudgetByUser', CreateBudgetByUser);
router.post('/api/budget/GetItemsBudgetFull', GetItemsBudgetFull);
router.post('/api/budget/GetBudgetsFull', GetBudgetsFull);
router.post('/api/budget/UpdateStateItem', UpdateStateItem); //ManagerDocumentController

router.post('/api/managerDocument/AddDocument', addDocument); //PatientController

router.post('/api/patient/GetPatient', GetPatient);
router.post('/api/patient/GetPatientByUserData', GetPatientByUserData);
router.post('/api/patient/AddPatient', AddPatientFile);
router.get('/api/patient/GetForecastsData', GetForecastsData);
router.post('/api/patient/ValidatePatientExistByUserData', ValidatePatientExistByUserData);
router.post('/api/patient/UpdatePatientFile', UpdatePatientFile);
router.post('/api/patient/SearchPatients', SearchPatients);
router.post('/api/patient/UpdateStatePatient', updateStatePatient); //ManagerDocumentController

router.post('/api/managerDocument/AddDocument', addDocument);
router.post('/api/managerDocument/GetDocuments', getDocuments);
router.post('/api/managerDocument/DestroyDocument', DestroyDocument); //HistoryController

router.post('/api/history/AddHistoryPatient', AddHistoryPatient);
router.post('/api/history/GetPatientHistory', GetPatientHistory); //TimeController

router.post('/api/time/AddTime', AddTime);
router.post('/api/time/GetTimes', GetTimes);
router.post('/api/time/ChangeStatusTime', ChangeStatusTime); //CampaignController

router.post('/api/campaign/AddCampaign', AddCampaign);
router.post('/api/campaign/GetCampaigns', GetCampaigns);
router.post('/api/campaign/AddItemCampaigns', AddItemCampaigns);
router.post('/api/campaign/GetCampaign', GetCampaign); //CronController

router.get('/api/cron/SendMail', SendMail); //DicomController

router.post('/api/dicom/AddFile', AddDicomFile);
router.post('/api/dicom/GetFilesDicomByPatient', GetFilesDicomByPatient);
router.post('/api/dicom/DeleteDicom', DeleteDicom);
router.post('/api/dicom/GetFileDicom', GetFileDicom);
module.exports = router;