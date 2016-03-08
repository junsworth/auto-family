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
var suppliers = require('./suppliers');
var customers = require('./customers');

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

router.get('/users/get/:id', auth.check, auth.get);
router.put('/users/update/:id', auth.check, auth.update);
router.delete('/users/delete/:id', auth.check, auth.delete);

// cars
router.get('/cars/makes', cars.makes);
router.get('/cars/models', cars.models);
router.get('/cars/cars', cars.cars);
router.post('/cars/add', cars.add);
router.get('/cars/get/:id', auth.check, cars.get);
router.put('/cars/update/:id', auth.check, cars.update);
router.delete('/cars/delete/:id', auth.check, cars.delete);

// suppliers
router.post('/suppliers/add', suppliers.add);
router.get('/suppliers/suppliers', suppliers.suppliers);
router.get('/suppliers/get/:id', auth.check, suppliers.get);
router.put('/suplliers/update/:id', auth.check, suppliers.update);
router.delete('/suppliers/delete/:id', auth.check, suppliers.delete);


// customers
router.post('/customers/add', customers.add);
router.get('/customers/customers', customers.customers);
router.get('/customers/get/:id', auth.check, customers.get);
router.put('/customers/update/:id', auth.check, customers.update);
router.delete('/customers/delete/:id', auth.check, customers.delete);

// image processing
router.post('/images/upload', multipartMiddleware, function(req, resp) {
  
  // don't forget to delete all req.files when done
  console.log(req.body, req.files);
  
  var file = req.files.file;
  var newFilePath = "/home/bugzilla/Documents/Development/auto-family/images/" + file.name;

  console.log('----------------------------------');
  console.log('filePath' + file.path);
  console.log('filename: ' + file.name);
  console.log('fileSize: '+ (file.size / 1024));
  console.log('----------------------------------');
  
  fs.readFile(req.files.file.path, function (err, data) {
    fs.writeFile(newFilePath, data, function (err) {
      console.log('*** File Saved ' + req.files.file.name + ' ***');
      resp.status(200).send();
    });
  });
});

module.exports = router;