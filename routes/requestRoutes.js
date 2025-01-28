const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// Routes - resolving request paths to functions to execute
router.get('/', requestController.getHome);
router.get('/studentHome',requestController.getStudentHome);
router.get('/employerHome',requestController.getEmployerHome);
router.get('/signup', requestController.getSignup);
router.post('/users', requestController.createAccount);
router.get('/signin', requestController.getSignin); 
router.post('/validatelogin', requestController.validateLogin);
router.get('/posts', requestController.getPost);
router.post('/posts', requestController.createPost);
router.get('/availableJobs', requestController.getJobs);
router.get('/application', requestController.getApplication);

module.exports = router;