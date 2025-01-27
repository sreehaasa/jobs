const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// Routes
router.get('/', requestController.getHome);
router.get('/signup', requestController.getSignup);
router.post('/users', requestController.createAccount);
router.get('/signin', requestController.getSignin); 
router.post('/validatelogin', requestController.validateLogin);
router.get('/posts', requestController.getPost);
router.post('/posts', requestController.createPost);
//router.get('/:id', requestController.getTodoById);
//router.post('/', requestController.createTodo);
//router.put('/:id', requestController.updateTodo);
//router.delete('/:id', requestController.deleteTodo);

module.exports = router;