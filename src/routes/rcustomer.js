
'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/ccustomer');
const authService = require('../services/auth-service');

router.get('/', authService.authorize, controller.get);
router.get('/:month', authService.authorize, controller.getByBirthMonth);
router.get('/admin/:id', authService.authorize, controller.getById);
router.post('/', authService.authorize, controller.post);
router.put('/:id', authService.authorize, controller.put);
router.delete('/', authService.authorize, controller.delete);
router.post('/authenticate', controller.authenticate);
router.post('/login', controller.authenticate);
router.post('/signup', controller.signup);
router.post('/refresh-token', authService.authorize, controller.refreshToken);

module.exports = router;