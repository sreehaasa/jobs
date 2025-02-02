const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req,file, callback){
        callback(null,'public/uploads/');
    },
    filename: function(req, file, callback){
        let extension = file.originalname.split('.').pop();
        callback(null, file.fieldname +'-'+ Date.now()+ '.'+extension);
    }
})
const upload = multer({storage: storage});

// Routes - resolving request paths to functions to execute
router.get('/',                 requestController.getHome);
router.get('/logout',           requestController.logoutHome);
router.get('/adminHome',        requestController.getAdminHome);
router.get('/studentHome',      requestController.getStudentHome);
router.get('/employerHome',     requestController.getEmployerHome);
router.get('/signup',           requestController.getSignup);
router.post('/users',           requestController.createAccount);
router.get('/signin',           requestController.getSignin); 
router.post('/validatelogin',   requestController.validateLogin);
router.get('/posts',            requestController.getPost);
router.post('/posts',           requestController.createPost);
router.post('/adminPost',       requestController.updatePost);
router.get('/availableJobs',    requestController.getJobs);
router.get('/application',      requestController.getApplication);
router.post('/application',     upload.single('resume'),requestController.createApplication);
router.get('/studentApplications', requestController.getStudentApplications);

module.exports = router;