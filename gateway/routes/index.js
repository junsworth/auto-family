'use strict'

var express = require('express');
var bodyParser = require('body-parser')
var db = require('../models/database');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var router = express.Router();

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

module.exports = router;