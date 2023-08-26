const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const JobController = require('../controllers/job.controller');
const ErrorHandler = require('../middleware/error.middleware');
const AuthGuard = require('../middleware/auth.middleware');
const schema = require('../validatons/auth.validation');
const validate = require('../utils/validator.util'); 

router.post('/register', validate(schema.register), ErrorHandler(AuthController.register));
router.post('/login',    validate(schema.login),    ErrorHandler(AuthController.login));
router.get('/user',      AuthGuard,                 ErrorHandler(AuthController.getUser));
router.post('/jobs',      AuthGuard,                 ErrorHandler(JobController.getJobs));
router.get('/job/:id',      AuthGuard,                 ErrorHandler(JobController.getJob));
router.get('/logout',    AuthGuard,                 ErrorHandler(AuthController.logout));

router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}))

module.exports = router;
