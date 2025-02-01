const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// Routes - resolving request paths to functions to execute
router.get('/', requestController.getHome);
router.get('/adminHome',requestController.getAdminHome);
router.get('/studentHome',requestController.getStudentHome);
router.get('/employerHome',requestController.getEmployerHome);
router.get('/signup', requestController.getSignup);
router.post('/users', requestController.createAccount);
router.get('/signin', requestController.getSignin); 
router.post('/validatelogin', requestController.validateLogin);
router.get('/posts', requestController.getPost);
router.post('/posts', requestController.createPost);
router.post('/adminPost', requestController.updatePost);
router.get('/availableJobs', requestController.getJobs);
router.get('/application', requestController.getApplication);
router.post('/application', requestController.createApplication);
router.get('/studentApplications', requestController.getStudentApplications);

module.exports = router;