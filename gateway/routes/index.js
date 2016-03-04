'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var db = require('../models/database');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var router = express.Router();

var auth = require('./auth');
var cars = require('./cars');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

// auth
router.post('/auth/login', auth.login);
router.post('/auth/logout', auth.logout);
router.get('/auth/user', auth.getUser);
router.get('/auth/users', auth.users);
router.post('/auth/reset', auth.reset);
router.post('/auth/add', auth.check, auth.add);

// cars
router.get('/cars/makes', cars.makes);
router.get('/cars/models', cars.models);

module.exports = router;